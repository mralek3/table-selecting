import { z } from 'zod';
import type { UploadFile } from 'antd/es/upload/interface';

// Вспомогательный регекс для чисел с точкой
const floatRegex = /^-?\d*(\.\d+)?$/;

export const projectFormSchema = z.object({
  programId: z.string().min(1, 'Выберите программу'), // В API это project.id
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
  
  // Координаты храним строками, чтобы удобно редактировать (точка/запятая)
  latitude: z.string().regex(floatRegex, 'Некорректное число').optional(),
  longitude: z.string().regex(floatRegex, 'Некорректное число').optional(),
  
  defaultZoom: z.number().int().positive('Должно быть положительным').optional(),
  miniMapDefaultZoom: z.number().int().positive('Должно быть положительным').optional(),
  
  isActive: z.boolean(),
  
  imageFiles: z.custom<UploadFile[]>()
    .refine((files) => Array.isArray(files) && files.length > 0, 'Изображение обязательно')
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const file = files[0];
      return !file.status || file.status !== 'error';
    }, 'Ошибка загрузки файла'),
})
.superRefine((values, ctx) => {
  // КРОСС-ВАЛИДАЦИЯ КООРДИНАТ
  const hasLat = !!values.latitude;
  const hasLng = !!values.longitude;

  if (hasLat !== hasLng) {
    // Если есть только одно из двух — ругаемся
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Широта и долгота должны быть заполнены вместе',
      path: ['latitude'], // Подсветим широту
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Широта и долгота должны быть заполнены вместе',
      path: ['longitude'], // Подсветим долготу
    });
  }
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

import { UploadFile } from 'antd/es/upload/interface';
import { SubProjectRequest, SubProjectResponse } from '@/shared/api/generated/model';
import { ProjectFormValues } from './types';

// Создаем фиктивный файл для отображения уже загруженной картинки
const createSyntheticFile = (url: string): UploadFile => ({
  uid: '-1',
  name: 'image.png',
  status: 'done',
  url,
});

export const mapResponseToForm = (
  data: SubProjectResponse,
  imageBlob?: Blob
): ProjectFormValues => {
  const imageUrl = data.imageUrl 
    ? (imageBlob ? URL.createObjectURL(imageBlob) : data.imageUrl)
    : '';

  const syntheticFile = createSyntheticFile(imageUrl);
  // Если есть Blob, подмешиваем originFileObj для превью
  if (imageBlob) {
    syntheticFile.originFileObj = imageBlob as File; // hack для превью
  }

  return {
    programId: data.project?.id ?? '', // ID Программы
    title: data.title ?? '',
    description: data.description ?? '',
    
    // Разворачиваем location
    latitude: data.location?.latitude?.toString() ?? '',
    longitude: data.location?.longitude?.toString() ?? '',
    defaultZoom: data.location?.defaultZoom ?? undefined,
    miniMapDefaultZoom: data.location?.miniMapDefaultZoom ?? undefined,
    
    isActive: data.isActive ?? true,
    imageFiles: imageUrl ? [syntheticFile] : [],
  };
};

export const mapFormToRequest = async (
  values: ProjectFormValues
): Promise<SubProjectRequest> => {
  
  // Обработка картинки (если новый файл)
  let imageRequest = undefined;
  const file = values.imageFiles?.[0];
  if (file && file.originFileObj) {
    // Здесь должна быть твоя логика загрузки файла или конвертации в base64
    // Для примера предполагаем, что отправляем просто объект, 
    // но обычно здесь FormData или отдельный запрос
    // imageRequest = ... 
  }

  // Собираем GeoLocation
  let location = undefined;
  if (values.latitude && values.longitude) {
    location = {
      latitude: parseFloat(values.latitude),
      longitude: parseFloat(values.longitude),
      defaultZoom: values.defaultZoom,
      miniMapDefaultZoom: values.miniMapDefaultZoom,
    };
  }


import { useForm } from '@tanstack/react-form';
import { standardSchemaValidator } from '@tanstack/react-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  useGetSubProjectsId, 
  usePostSubProjects, 
  usePutSubProjectsId,
  useGetProjects // Это запрос списка Программ
} from '@/shared/api/generated/endpoints';
import { projectFormSchema, type ProjectFormValues } from './types';
import { mapResponseToForm, mapFormToRequest } from './mappers';

interface UseProjectFormProps {
  projectId?: string; // ID SubProject (Проекта в UI)
  onSuccess?: (id?: string) => void;
  onClose?: () => void;
}

export const useProjectForm = ({ projectId, onSuccess, onClose }: UseProjectFormProps) => {
  const isEditMode = Boolean(projectId);
  const queryClient = useQueryClient();

  const createMutation = usePostSubProjects();
  const updateMutation = usePutSubProjectsId();

  // 1. Получаем список Программ для селекта
  const { data: programsResult, isLoading: isProgramsLoading } = useGetProjects();
  const programsList = programsResult?.data?.items || []; // Предполагаемая структура пагинации

  // 2. Получаем данные Проекта (SubProject)
  const { 
    data: projectResult, 
    isLoading: isProjectLoading 
  } = useGetSubProjectsId(projectId!, { 
    query: { enabled: isEditMode, staleTime: 0 } 
  });
  const projectData = projectResult?.data;

  // 3. Загрузка картинки (Blob)
  const { data: imageBlob, isLoading: isImageLoading } = useQuery({
    queryKey: ['subproject-image', projectData?.imageUrl],
    queryFn: async () => {
      if (!projectData?.imageUrl) throw new Error('No URL');
      const res = await axios.get(projectData.imageUrl, { responseType: 'blob' });
      return res.data as Blob;
    },
    enabled: !!projectData?.imageUrl,
    staleTime: 0,
  });

  const isReady = !isEditMode || (!!projectData && !!imageBlob);

  const form = useForm({
    defaultValues: isReady && isEditMode && projectData
      ? mapResponseToForm(projectData, imageBlob)
      : {
          programId: '',
          title: '',
          description: '',
          latitude: '',
          longitude: '',
          isActive: true,
          imageFiles: [],
        } as ProjectFormValues,

    validatorAdapter: standardSchemaValidator(),
    validators: {
      onChange: projectFormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        const requestPayload = await mapFormToRequest(value as ProjectFormValues);
        let resultId = projectId;

        if (isEditMode && projectId) {
          await updateMutation.mutateAsync({ id: projectId, data: requestPayload });
          // Чистим кэш
          await queryClient.removeQueries({ queryKey: ['subprojects', projectId] });
          await queryClient.removeQueries({ queryKey: ['subproject-image'] });
        } else {
          const res = await createMutation.mutateAsync({ data: requestPayload });
          resultId = res.data?.id;
        }

        await queryClient.invalidateQueries({ queryKey: ['subprojects'] });
        
        // Просто сброс без сложной логики dirty, как ты просил
        formApi.reset(value as ProjectFormValues);
        
        onSuccess?.(resultId);
      } catch (e) {
        console.error('Ошибка сохранения:', e);
      }
    },
  });

  return {
    form,
    programsList,
    isLoading: isProgramsLoading || (isEditMode && (isProjectLoading || isImageLoading)),
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isEditMode,
    isReady,
  };
};


import React from 'react';
import { Form, Input, InputNumber, Button, Switch, Upload, Flex, Select, Spin, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProgramImagePreview } from '@/features/program/ui/program-image-preview'; // Реюзаем компонент
import { useProjectForm } from '../model/use-project-form';

interface ProjectFormProps {
  projectId?: string;
  onClose: () => void;
  onSubmit?: (id?: string) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ projectId, onClose, onSubmit }) => {
  const { 
    form, 
    programsList, 
    isLoading, 
    isSubmitting, 
    isEditMode,
    isReady 
  } = useProjectForm({
    projectId,
    onSuccess: (id) => onSubmit ? onSubmit(id) : onClose(),
    onClose
  });

  if (isLoading || !isReady) {
    return <Flex justify="center" align="center" style={{ height: 200 }}><Spin /></Flex>;
  }

  return (
    <form.Provider>
      <Form layout="vertical" onFinish={(e) => { e.preventDefault(); form.handleSubmit(); }}>
        
        {/* --- Программа (Select) --- */}
        <form.Field
          name="programId"
          children={(field) => (
            <Form.Item
              label="Программа"
              required
              help={field.state.meta.errors.map(e => e?.message).join(', ')}
              validateStatus={field.state.meta.errors.length ? 'error' : ''}
            >
              <Select
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                placeholder="Выберите программу"
                options={programsList.map(p => ({ label: p.title, value: p.id }))}
              />
            </Form.Item>
          )}
        />

        {/* --- Название --- */}
        <form.Field
          name="title"
          children={(field) => (
            <Form.Item
              label="Название проекта"
              required
              help={field.state.meta.errors.map(e => e?.message).join(', ')}
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

        {/* --- Описание (Заглушка для Quill) --- */}
        <form.Field
          name="description"
          children={(field) => (
            <Form.Item label="Описание">
              <Input.TextArea
                rows={4}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Form.Item>
          )}
        />

        {/* --- Координаты (В одну строку) --- */}
        <Row gutter={16}>
          <Col span={12}>
            <form.Field
              name="latitude"
              children={(field) => (
                <Form.Item
                  label="Широта"
                  help={field.state.meta.errors.map(e => e?.message).join(', ')}
                  validateStatus={field.state.meta.errors.length ? 'error' : ''}
                >
                  <Input
                    placeholder="55.7558"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Form.Item>
              )}
            />
          </Col>
          <Col span={12}>
            <form.Field
              name="longitude"
              children={(field) => (
                <Form.Item
                  label="Долгота"
                  help={field.state.meta.errors.map(e => e?.message).join(', ')}
                  validateStatus={field.state.meta.errors.length ? 'error' : ''}
                >
                  <Input
                    placeholder="37.6173"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Form.Item>
              )}
            />
          </Col>
        </Row>

        {/* --- Масштабы (В одну строку) --- */}
        <Row gutter={16}>
          <Col span={12}>
            <form.Field
              name="defaultZoom"
              children={(field) => (
                <Form.Item
                  label="Масштаб (карта)"
                  help={field.state.meta.errors.map(e => e?.message).join(', ')}
                  validateStatus={field.state.meta.errors.length ? 'error' : ''}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val as number)}
                  />
                </Form.Item>
              )}
            />
          </Col>
          <Col span={12}>
            <form.Field
              name="miniMapDefaultZoom"
              children={(field) => (
                <Form.Item
                  label="Масштаб (мини-карта)"
                  help={field.state.meta.errors.map(e => e?.message).join(', ')}
                  validateStatus={field.state.meta.errors.length ? 'error' : ''}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val as number)}
                  />
                </Form.Item>
              )}
            />
          </Col>
        </Row>

        {/* --- Изображение --- */}
        <form.Field
          name="imageFiles"
          children={(field) => (
            <Form.Item
              label="Обложка"
              required
              help={field.state.meta.errors.map(e => e?.message).join(', ')}
              validateStatus={field.state.meta.errors.length ? 'error' : ''}
            >
              <Flex gap="middle" align="start">
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  fileList={field.state.value || []}
                  beforeUpload={() => false}
                  showUploadList={{ showPreviewIcon: false }}
                  onChange={({ fileList }) => field.handleChange(fileList)}
                >
                  {(field.state.value?.length || 0) < 1 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Фото</div>
                    </div>
                  )}
                </Upload>
                <ProgramImagePreview file={field.state.value?.[0]} />
              </Flex>
            </Form.Item>
          )}
        />

        {/* --- Активность --- */}
        <form.Field
          name="isActive"
          children={(field) => (
            <Form.Item label="Показывать проект">
              <Switch
                checked={field.state.value}
                onChange={(checked) => field.handleChange(checked)}
              />
            </Form.Item>
          )}
        />

        {/* --- Кнопки --- */}
        <Flex gap="small" justify="end" style={{ marginTop: 24 }}>
          <Button onClick={onClose}>Отмена</Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting] as const}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="primary"
                onClick={() => form.handleSubmit()}
                loading={isSubmitting}
                disabled={!canSubmit}
              >
                {isEditMode ? 'Сохранить' : 'Создать'}
              </Button>
            )}
          />
        </Flex>
      </Form>
    </form.Provider>
  );
};

  return {
    project: { id: values.programId }, // Связь с программой
    title: values.title,
    description: values.description,
    isActive: values.isActive,
    location: location,
    // image: imageRequest, // Раскомментируй, когда реализуешь загрузку
  };
};

