/* quill-overrides.css */

/* 1. Основные контейнеры и шрифт */
.ql-container {
  font-family: var(--ant-font-family) !important;
  font-size: var(--ant-font-size) !important;
  background-color: var(--ant-color-bg-container);
  color: var(--ant-color-text);
}

.ql-editor {
  line-height: var(--ant-line-height);
}

.ql-editor.ql-blank::before {
  color: var(--ant-color-text-placeholder) !important;
  font-style: normal;
}

/* 2. Панель инструментов (Toolbar) */
.ql-toolbar.ql-snow {
  border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border) !important;
  background-color: var(--ant-color-bg-container);
  font-family: var(--ant-font-family) !important;
}

.ql-container.ql-snow {
  border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border) !important;
}

/* 3. Кнопки и иконки */
.ql-snow.ql-toolbar button svg,
.ql-snow .ql-toolbar button svg {
  stroke: var(--ant-color-text);
}

.ql-snow.ql-toolbar button .ql-fill,
.ql-snow .ql-toolbar button .ql-fill {
  fill: var(--ant-color-text);
}

.ql-snow.ql-toolbar button .ql-stroke {
  stroke: var(--ant-color-text);
}

/* Состояния Hover и Active (Primary color) */
.ql-snow.ql-toolbar button:hover,
.ql-snow.ql-toolbar button:focus,
.ql-snow.ql-toolbar button.ql-active,
.ql-snow.ql-toolbar .ql-picker-label:hover,
.ql-snow.ql-toolbar .ql-picker-label.ql-active,
.ql-snow.ql-toolbar .ql-picker-item:hover,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected {
  color: var(--ant-color-primary) !important;
}

.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill {
  fill: var(--ant-color-primary) !important;
}

.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
  stroke: var(--ant-color-primary) !important;
}

/* 4. Выпадающие списки (Pickers) */
.ql-snow .ql-picker {
  color: var(--ant-color-text);
}

.ql-snow .ql-picker-options {
  background-color: var(--ant-color-bg-elevated) !important;
  border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border) !important;
  box-shadow: var(--ant-box-shadow-secondary);
  border-radius: var(--ant-border-radius);
}

.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
  border-color: var(--ant-color-primary-border) !important;
}

/* 5. Элементы редактора (цитаты, код, ссылки) */
.ql-snow .ql-editor blockquote {
  border-left: 4px solid var(--ant-color-primary);
  color: var(--ant-color-text-secondary);
}

.ql-snow .ql-editor code,
.ql-snow .ql-editor .ql-code-block-container {
  background-color: var(--ant-color-fill-tertiary) !important;
  color: var(--ant-color-text);
  font-family: var(--ant-font-family-code) !important;
  border-radius: var(--ant-border-radius-sm);
}

.ql-snow .ql-editor a {
  color: var(--ant-color-link);
}

.ql-snow .ql-editor a:hover {
  color: var(--ant-color-link-hover);
}

/* 6. Тултипы (Tooltip / Link Edit) */
.ql-snow .ql-tooltip {
  background-color: var(--ant-color-bg-elevated) !important;
  border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border) !important;
  color: var(--ant-color-text) !important;
  box-shadow: var(--ant-box-shadow);
  border-radius: var(--ant-border-radius);
}

.ql-snow .ql-tooltip input[type=text] {
  background-color: var(--ant-color-bg-container);
  border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border);
  color: var(--ant-color-text);
  border-radius: var(--ant-border-radius-sm);
}

/* 7. Таблицы */
.ql-editor td {
  border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border) !important;
}
