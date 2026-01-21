/* quill-overrides.css */

:root {
  --ant-border-style: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary);
}

/* Группируем все стили темы Snow */
.ql-snow {
  font-family: var(--ant-font-family);

  /* 1. Контейнеры (Тулбар и Область ввода) */
  &.ql-toolbar, 
  &.ql-container {
    border: var(--ant-border-style) !important;
    background-color: var(--ant-color-bg-container);
  }

  &.ql-toolbar {
    border-radius: var(--ant-border-radius-lg) var(--ant-border-radius-lg) 0 0;
    padding: var(--ant-padding-xs) !important;
    border-bottom: none !important;

    /* 2. Кнопки в тулбаре (стиль antd Link Button) */
    button {
      background: transparent !important;
      border: none !important;
      border-radius: var(--ant-border-radius-sm);
      transition: all var(--ant-motion-duration-mid);
      color: var(--ant-color-text);
      width: auto !important;
      min-width: 24px;
      height: 24px;
      padding: 0 4px !important;
      display: flex;
      align-items: center;
      justify-content: center;

      .ql-stroke {
        stroke: var(--ant-color-text);
        transition: stroke var(--ant-motion-duration-mid);
      }
      .ql-fill {
        fill: var(--ant-color-text);
        transition: fill var(--ant-motion-duration-mid);
      }

      &:hover, 
      &.ql-active {
        color: var(--ant-color-primary-hover) !important;
        
        .ql-stroke { stroke: var(--ant-color-primary-hover) !important; }
        .ql-fill { fill: var(--ant-color-primary-hover) !important; }
      }
    }
  }

  &.ql-container {
    border-radius: 0 0 var(--ant-border-radius-lg) var(--ant-border-radius-lg);
    color: var(--ant-color-text);
    font-size: var(--ant-font-size);

    /* 3. Внутренний редактор */
    .ql-editor {
      padding: var(--ant-padding-md) var(--ant-padding-lg);
      line-height: var(--ant-line-height);

      &.ql-blank::before {
        color: var(--ant-color-text-placeholder);
        left: var(--ant-padding-lg);
        font-style: normal;
      }

      blockquote {
        border-left: 4px solid var(--ant-color-primary);
        color: var(--ant-color-text-description);
        background: var(--ant-color-fill-alter);
        padding: var(--ant-padding-xs) var(--ant-padding-md);
      }

      code, .ql-code-block-container {
        background-color: var(--ant-color-fill-secondary);
        border-radius: var(--ant-border-radius-sm);
        font-family: var(--ant-font-family-code);
      }
    }
  }

  /* 4. Выпадающие списки (Pickers) */
  .ql-picker {
    color: var(--ant-color-text);
    font-size: var(--ant-font-size-sm);
    height: 24px;

    .ql-picker-label {
      border: 1px solid transparent !important;
      border-radius: var(--ant-border-radius-sm);
      padding-left: var(--ant-padding-xxs) !important;
      transition: all var(--ant-motion-duration-mid);

      &:hover { color: var(--ant-color-primary-hover) !important; }
    }

    .ql-picker-options {
      background-color: var(--ant-color-bg-elevated);
      border: none !important;
      box-shadow: var(--ant-box-shadow-secondary);
      border-radius: var(--ant-border-radius-lg);
      padding: var(--ant-padding-xxs) !important;
    }

    .ql-picker-item {
      border-radius: var(--ant-border-radius-sm);
      padding: var(--ant-padding-xxs) var(--ant-padding-xs) !important;
      transition: background var(--ant-motion-duration-mid);

      &:hover {
        background-color: var(--ant-color-bg-text-hover);
        color: var(--ant-color-primary) !important;
      }
      &.ql-selected {
        color: var(--ant-color-primary) !important;
        background-color: var(--ant-color-primary-bg);
      }
    }
  }

  /* 5. Тултипы (Вставка ссылок/видео) */
  .ql-tooltip {
    background-color: var(--ant-color-bg-elevated);
    border: none !important;
    box-shadow: var(--ant-box-shadow);
    border-radius: var(--ant-border-radius-lg);
    padding: var(--ant-padding-sm) var(--ant-padding-md) !important;
    color: var(--ant-color-text);
    z-index: var(--ant-z-index-popup);

    input[type=text] {
      border: var(--ant-border-style) !important;
      border-radius: var(--ant-border-radius-sm);
      height: var(--ant-control-height-sm);
      padding: 0 var(--ant-padding-xs);
      background: var(--ant-color-bg-container);
      color: var(--ant-color-text);
      outline: none;

      &:focus {
        border-color: var(--ant-color-primary) !important;
        box-shadow: 0 0 0 2px var(--ant-color-primary-outline);
      }
    }
    
    a.ql-action::after {
      border-right: 1px solid var(--ant-color-border-secondary);
    }
  }
}
