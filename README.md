/* quill-overrides.css */

/* Базовые настройки шрифтов и цветов для всего редактора */
.ql-snow, .ql-container.ql-snow, .ql-toolbar.ql-snow {
  font-family: var(--ant-font-family) !important;
  font-size: var(--ant-font-size) !important;
  color: var(--ant-color-text) !important;
}

/* Панель инструментов (Toolbar) */
.ql-toolbar.ql-snow {
  border: 1px solid var(--ant-color-border) !important;
  border-radius: var(--ant-border-radius) !important;
  background-color: var(--ant-color-bg-container) !important;
  margin-bottom: 8px !important; /* Разделяем блоки */
  padding: 8px !important;

  /* Кнопки в стиле AntD Button variant="link" */
  button, .ql-picker-label {
    background: transparent !important;
    border: none !important;
    color: var(--ant-color-text) !important;
    transition: color var(--ant-motion-duration-mid) !important;

    .ql-stroke {
      stroke: var(--ant-color-text) !important;
      transition: stroke var(--ant-motion-duration-mid) !important;
    }
    .ql-fill {
      fill: var(--ant-color-text) !important;
      transition: fill var(--ant-motion-duration-mid) !important;
    }

    &:hover {
      color: var(--ant-color-primary-hover) !important;
      background: transparent !important;

      .ql-stroke {
        stroke: var(--ant-color-primary-hover) !important;
      }
      .ql-fill {
        fill: var(--ant-color-primary-hover) !important;
      }
    }

    &.ql-active {
      color: var(--ant-color-primary) !important;
      .ql-stroke {
        stroke: var(--ant-color-primary) !important;
      }
      .ql-fill {
        fill: var(--ant-color-primary) !important;
      }
    }
  }

  /* Выпадающие списки в тулбаре */
  .ql-picker {
    .ql-picker-label:hover {
      color: var(--ant-color-primary-hover) !important;
    }
    
    .ql-picker-options {
      background-color: var(--ant-color-bg-elevated) !important;
      border-radius: var(--ant-border-radius-lg) !important;
      box-shadow: var(--ant-box-shadow-secondary) !important;
      border: none !important;
      padding: 4px !important;

      .ql-picker-item {
        border-radius: var(--ant-border-radius-sm) !important;
        &:hover {
          background-color: var(--ant-control-item-bg-hover) !important;
          color: var(--ant-color-primary) !important;
        }
      }
    }
  }
}

/* Контейнер редактора (Container) - имитация AntD Input */
.ql-container.ql-snow {
  border: 1px solid var(--ant-color-border) !important;
  border-radius: var(--ant-border-radius) !important;
  background-color: var(--ant-color-bg-container) !important;
  transition: all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out) !important;

  /* Эффект Hover как у Input */
  &:hover {
    border-color: var(--ant-color-primary-hover) !important;
  }

  /* Эффект Focus (когда внутри редактора активен курсор) */
  &:has(.ql-editor:focus) {
    border-color: var(--ant-color-primary) !important;
    box-shadow: 0 0 0 2px var(--ant-color-primary-outline) !important;
    outline: none !important;
  }

  .ql-editor {
    padding: var(--ant-padding-content-vertical) var(--ant-padding-content-horizontal) !important;
    line-height: var(--ant-line-height) !important;

    &.ql-blank::before {
      color: var(--ant-color-text-placeholder) !important;
      font-style: normal !important;
      left: var(--ant-padding-content-horizontal) !important;
    }

    /* Ссылки */
    a {
      color: var(--ant-color-link) !important;
      &:hover {
        color: var(--ant-color-link-hover) !important;
      }
    }
  }
}

/* Всплывающие подсказки и тултипы */
.ql-snow .ql-tooltip {
  background-color: var(--ant-color-bg-elevated) !important;
  border-radius: var(--ant-border-radius-lg) !important;
  box-shadow: var(--ant-box-shadow-secondary) !important;
  border: 1px solid var(--ant-color-border-secondary) !important;
  padding: 8px 12px !important;
  
  input[type=text] {
    border: 1px solid var(--ant-color-border) !important;
    border-radius: var(--ant-border-radius-sm) !important;
    background-color: var(--ant-color-bg-container) !important;
    color: var(--ant-color-text) !important;
    outline: none !important;
    transition: all var(--ant-motion-duration-mid) !important;

    &:focus {
      border-color: var(--ant-color-primary) !important;
      box-shadow: 0 0 0 2px var(--ant-color-primary-outline) !important;
    }
  }

  a.ql-action::after {
    color: var(--ant-color-primary) !important;
  }
}
