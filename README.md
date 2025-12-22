# Реализация фичи "Управление Программой" (Features/Program)

Этот документ содержит полный исходный код фичи для управления программами, включая типы, мапперы, логику и UI.

## 1. Типы и Схемы (`src/features/program/model/types.ts`)

```typescript
import { z } from 'zod';
import type { UploadFile } from 'antd/es/upload/interface';

// Zod схема валидации формы
export const programFormSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен'),
  description: z.string().optional().nullable(), // DTO позволяет null
  
  // Валидация массива файлов (минимум 1, без ошибок загрузки)
  imageFiles: z.custom<UploadFile[]>()
    .refine((files) => Array.isArray(files) && files.length > 0, 'Изображение обязательно')
    .refine((files) => {
      const file = files[0];
      return file && (!file.status || file.status !== 'error');
    }, 'Ошибка загрузки файла'),
    
  isActive: z.boolean(),
  isHidden: z.boolean(),
  showCommonSubProject: z.boolean(),
});

// Выведенный TypeScript тип для формы
export type ProgramFormValues = z.infer<typeof programFormSchema>;
```

## 2. Мапперы данных (`src/features/program/model/mappers.ts`)

```typescript
import type { UploadFile } from 'antd/es/upload/interface';
import type { ProgramResponse, ProgramRequest, FileRequest } from '@/shared/api/generated/schemas';
import type { ProgramFormValues } from './types';

/**
 * Хелпер: Конвертация File в Base64 (только тело, без префикса data:image/...)
 */
const fileToBase64Body = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Отсекаем "data:image/png;base64," чтобы получить чистое тело
      const base64Body = result.split(',')[1] || result;
      resolve(base64Body);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * INBOUND: Данные с бэкенда (DTO + Blob) -> Данные формы
 */
export const mapResponseToForm = (
  data: ProgramResponse, 
  imageBlob: Blob
): ProgramFormValues => {
  // Создаем URL для превью из Blob
  const previewUrl = URL.createObjectURL(imageBlob);

  // Создаем синтетический объект файла для Antd Upload
  const syntheticFile: UploadFile = {
    uid: '-1',
    name: 'current-image', 
    status: 'done',
    url: previewUrl,
    originFileObj: new File([imageBlob], 'current-image', { type: imageBlob.type }),
  };

  return {
    title: data.title ?? '',
    description: data.description,
    isActive: data.isActive ?? true,
    isHidden: data.isHidden ?? false,
    showCommonSubProject: data.showCommonSubProject ?? false,
    imageFiles: [syntheticFile],
  };
};

/**
 * OUTBOUND: Данные формы -> Запрос на бэкенд (DTO)
 * Учитывает dirtyFields для частичного обновления
 */
export const mapFormToRequest = async (
  values: ProgramFormValues,
  dirtyFields: Record<string, boolean>,
  isCreateMode: boolean
): Promise<ProgramRequest> => {
  const request: ProgramRequest = {};

  // Хелпер: поле отправляем, если это создание или если поле было изменено
  const shouldSend = (key: keyof ProgramFormValues) => isCreateMode || dirtyFields[key];

  if (shouldSend('title')) request.title = values.title;
  if (shouldSend('description')) request.description = values.description;
  if (shouldSend('isActive')) request.isActive = values.isActive;
  if (shouldSend('isHidden')) request.isHidden = values.isHidden;
  if (shouldSend('showCommonSubProject')) request.showCommonSubProject = values.showCommonSubProject;

  // Обработка изображения
  if (shouldSend('imageFiles')) {
    const file = values.imageFiles[0]?.originFileObj;
    
    if (file) {
      const base64Body = await fileToBase64Body(file as File);
      
      // Получаем расширение файла (png, jpg) без точки
      const extension = file.name.split('.').pop()?.toLowerCase() || 'png';

      const fileRequest: FileRequest = {
        title: file.name,
        type: extension, // Бэкенд ждет расширение, а не mime-type
        body: base64Body
      };
      
      request.image = fileRequest;
    }
  }

  return request;
};
```

## 3. Хук логики (`src/features/program/model/use-program-form.ts`)

```typescript
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  useGetProgramsId, 
  usePostPrograms, 
  usePutProgramsId 
} from '@/shared/api/generated/endpoints';
import { programFormSchema, type ProgramFormValues } from './types';
import { mapResponseToForm, mapFormToRequest } from './mappers';

interface UseProgramFormProps {
  programId?: string;
  onSuccess?: () => void;
}

export const useProgramForm = ({ programId, onSuccess }: UseProgramFormProps) => {
  const isEditMode = Boolean(programId);
  const queryClient = useQueryClient();

  // --- 1. Мутации Orval ---
  const createMutation = usePostPrograms();
  const updateMutation = usePutProgramsId();

  // --- 2. Получение данных (Зависимые запросы) ---
  
  // Шаг А: Получаем JSON данные программы
  const { 
    data: programResult, 
    isLoading: isProgramLoading, 
    isError: isProgramError 
  } = useGetProgramsId(
    programId!, 
    { query: { enabled: isEditMode, staleTime: 0 } }
  );
  
  const programData = programResult?.data;

  // Шаг Б: Получаем Blob картинки (только если есть URL)
  const { 
    data: imageBlob, 
    isLoading: isImageLoading, 
    isError: isImageError 
  } = useQuery({
    queryKey: ['program-image', programData?.imageUrl],
    queryFn: async () => {
      if (!programData?.imageUrl) throw new Error('No URL');
      // Используем axios напрямую для blob
      const res = await axios.get(programData.imageUrl, { responseType: 'blob' });
      return res.data as Blob;
    },
    enabled: !!programData?.imageUrl,
    staleTime: 0,
  });

  // Флаг: Форма готова к инициализации (для редактирования нужны оба запроса)
  const isReady = !isEditMode || (!!programData && !!imageBlob);

  // --- 3. Инициализация формы ---
  const form = useForm<ProgramFormValues>({
    defaultValues: isReady && isEditMode && programData && imageBlob
      ? mapResponseToForm(programData, imageBlob)
      : {
          title: '',
          description: '',
          isActive: true,
          isHidden: false,
          showCommonSubProject: false,
          imageFiles: [],
        },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: programFormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const dirtyFields = formApi.state.dirtyFields;

      // Оптимизация: если редактирование и нет изменений - не отправляем
      if (isEditMode && Object.keys(dirtyFields).length === 0) {
        onSuccess?.();
        return;
      }

      try {
        // Подготовка JSON payload
        const requestPayload = await mapFormToRequest(value, dirtyFields, !isEditMode);

        if (isEditMode && programId) {
          await updateMutation.mutateAsync({ 
            id: programId, 
            data: requestPayload 
          });
        } else {
          await createMutation.mutateAsync({ 
            data: requestPayload 
          });
        }

        // Инвалидация списка программ
        await queryClient.invalidateQueries({ queryKey: ['programs'] }); // Убедись, что ключ совпадает с Orval
        onSuccess?.();
      } catch (e) {
        console.error('Ошибка при сохранении:', e);
        // Здесь можно вызвать notification.error из antd
      }
    },
  });

  return {
    form,
    // Общий статус загрузки
    isLoading: isEditMode && (isProgramLoading || isImageLoading),
    // Общий статус ошибки
    isError: isEditMode && (isProgramError || isImageError),
    isReady,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isEditMode,
  };
};
```

## 4. UI Компонент (`src/features/program/ui/program-form.tsx`)

```tsx
import React, { useEffect } from 'react';
import { Form, Input, Switch, Upload, Button, Image, Flex, Spin, Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useProgramForm } from '../model/use-program-form';

interface ProgramFormProps {
  programId?: string;
  onClose: () => void;
}

export const ProgramForm: React.FC<ProgramFormProps> = ({ programId, onClose }) => {
  const { form, isLoading, isError, isReady, isSubmitting, isEditMode } = useProgramForm({
    programId,
    onSuccess: onClose,
  });

  // Очистка памяти (ObjectURL) при размонтировании
  useEffect(() => {
    return () => {
      // Пытаемся получить текущий URL файла из стейта формы для очистки
      // Безопасная очистка ссылок
      const files = form.getFieldValue('imageFiles');
      if (files?.[0]?.url) {
        URL.revokeObjectURL(files[0].url);
      }
    };
  }, [form]);

  if (isLoading || !isReady) {
    return (
      <Flex justify="center" align="center" style={{ height: 300 }}>
        <Spin size="large" tip="Загрузка данных..." />
      </Flex>
    );
  }

  if (isError) {
    return <Typography.Text type="danger">Ошибка загрузки программы</Typography.Text>;
  }

  return (
    <Card title={isEditMode ? 'Редактирование программы' : 'Новая программа'} bordered={false}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* --- TITLE --- */}
        <form.Field
          name="title"
          children={(field) => (
            <Form.Item
              label="Название"
              required
              help={field.state.meta.errors.join(', ')}
              validateStatus={field.state.meta.errors.length ? 'error' : ''}
            >
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Form.Item>
          )}
        />

        {/* --- DESCRIPTION --- */}
        <form.Field
          name="description"
          children={(field) => (
            <Form.Item label="Описание">
              <Input.TextArea
                rows={4}
                value={field.state.value || ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Form.Item>
          )}
        />

        {/* --- UPLOAD + PREVIEW --- */}
        <form.Field
          name="imageFiles"
          children={(field) => {
            const fileList = field.state.value || [];
            
            // Логика вычисления URL для превью:
            // 1. Либо url уже есть (пришел с бэка или создан при загрузке)
            // 2. Либо создаем временный для нового файла
            const file = fileList[0];
            let previewUrl = file?.url || '';
            
            if (!previewUrl && file?.originFileObj) {
              previewUrl = URL.createObjectURL(file.originFileObj);
            }

            return (
              <Form.Item
                label="Обложка"
                required
                help={field.state.meta.errors.join(', ')}
                validateStatus={field.state.meta.errors.length ? 'error' : ''}
              >
                <Flex gap="middle" align="start">
                  <Upload
                    listType="picture-card"
                    maxCount={1}
                    fileList={fileList}
                    // Отменяем автоматическую XHR загрузку
                    beforeUpload={() => false}
                    showUploadList={{ showPreviewIcon: false }}
                    onChange={({ fileList: newFileList }) => {
                      field.handleChange(newFileList);
                    }}
                  >
                    {fileList.length < 1 && (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Фото</div>
                      </div>
                    )}
                  </Upload>
                  
                  {/* Отдельный компонент превью */}
                  {previewUrl && (
                    <div style={{ border: '1px solid #d9d9d9', padding: 8, borderRadius: 8 }}>
                       <Image 
                         width={100}
                         height={100}
                         src={previewUrl} 
                         style={{ objectFit: 'cover', borderRadius: 4 }}
                         alt="Preview"
                       />
                    </div>
                  )}
                </Flex>
              </Form.Item>
            );
          }}
        />

        {/* --- SWITCHES GROUP --- */}
        <Flex vertical gap="small" style={{ marginBottom: 24 }}>
          
          <form.Field
            name="isActive"
            children={(field) => (
              <Form.Item label="Активна" style={{ marginBottom: 0 }} labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                <Switch
                  checked={field.state.value}
                  onChange={(checked) => field.handleChange(checked)}
                />
              </Form.Item>
            )}
          />

          <form.Field
            name="isHidden"
            children={(field) => (
              <Form.Item label="Скрыта" style={{ marginBottom: 0 }} labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                <Switch
                  checked={field.state.value}
                  onChange={(checked) => field.handleChange(checked)}
                />
              </Form.Item>
            )}
          />

          <form.Field
            name="showCommonSubProject"
            children={(field) => (
              <Form.Item 
                label="Автоматически формировать общее" 
                style={{ marginBottom: 0 }} 
                labelCol={{ span: 12 }} 
                wrapperCol={{ span: 12 }}
              >
                <Switch
                  checked={field.state.value}
                  onChange={(checked) => field.handleChange(checked)}
                />
              </Form.Item>
            )}
          />
        </Flex>

        {/* --- ACTIONS --- */}
        <Flex gap="small" justify="end">
           <Button onClick={onClose} disabled={isSubmitting}>
             Отмена
           </Button>
           
           <form.Subscribe
            selector={(state) => [state.canSubmit, state.isDirty, state.isSubmitting]}
            children={([canSubmit, isDirty, isSubmitting]) => (
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                // Логика disabled:
                // 1. Форма должна быть валидна (canSubmit)
                // 2. Если это редактирование, то должны быть изменения (isDirty)
                // 3. Если создание, isDirty будет true при вводе данных
                disabled={!canSubmit || (isEditMode && !isDirty)}
              >
                {isEditMode ? 'Сохранить' : 'Создать'}
              </Button>
            )}
          />
        </Flex>
      </form>
    </Card>
  );
};
```
