/* quill-overrides.css */

.ql-snow {
  font-family: var(--ant-font-family);
  --ant-border-base: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary);

  /* 1. Общие контейнеры */
  &.ql-toolbar, 
  &.ql-container {
    background-color: var(--ant-color-bg-container);
    border: var(--ant-border-base) !important;
    color: var(--ant-color-text);
  }

  &.ql-toolbar {
    border-radius: var(--ant-border-radius-lg) var(--ant-border-radius-lg) 0 0;
    padding: var(--ant-padding-xs) !important;
    border-bottom: none !important;
    display: flex;
    flex-wrap: wrap;
    gap: var(--ant-size-xxs);

    /* Группы форматов */
    .ql-formats {
      margin-right: var(--ant-margin-sm) !important;
      display: flex;
      align-items: center;
    }

    /* 2. Кнопки (стиль antd Button type="link" / "text") */
    button {
      background: transparent !important;
      border: none !important;
      border-radius: var(--ant-border-radius-sm);
      transition: all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out);
      color: var(--ant-color-text);
      height: var(--ant-control-height-sm) !important;
      width: auto !important;
      min-width: var(--ant-control-height-sm);
      padding: 0 var(--ant-padding-xxs) !important;
      display: flex;
      align-items: center;
      justify-content: center;

      .ql-stroke {
        stroke: var(--ant-color-text);
        stroke-width: var(--ant-line-width-bold);
        transition: stroke var(--ant-motion-duration-mid);
      }
      .ql-fill {
        fill: var(--ant-color-text);
        transition: fill var(--ant-motion-duration-mid);
      }

      &:hover, 
      &.ql-active {
        background-color: var(--ant-color-bg-text-hover) !important;
        color: var(--ant-color-primary-hover) !important;
        
        .ql-stroke { stroke: var(--ant-color-primary-hover) !important; }
        .ql-fill { fill: var(--ant-color-primary-hover) !important; }
      }
    }
  }

  &.ql-container {
    border-radius: 0 0 var(--ant-border-radius-lg) var(--ant-border-radius-lg);
    font-size: var(--ant-font-size);

    /* 3. Область редактора */
    .ql-editor {
      padding: var(--ant-padding-content-vertical) var(--ant-padding-content-horizontal);
      line-height: var(--ant-line-height);
      min-height: 120px;

      &.ql-blank::before {
        color: var(--ant-color-text-placeholder);
        left: var(--ant-padding-content-horizontal);
        font-style: normal;
      }

      /* Стили текста внутри */
      blockquote {
        border-left: var(--ant-line-width-focus) var(--ant-line-type) var(--ant-color-primary);
        color: var(--ant-color-text-description);
        background: var(--ant-color-fill-alter);
        padding: var(--ant-padding-xs) var(--ant-padding-md);
        margin: var(--ant-margin-sm) 0;
      }

      code, .ql-code-block-container {
        background-color: var(--ant-color-fill-secondary);
        border-radius: var(--ant-border-radius-sm);
        font-family: var(--ant-font-family-code);
        padding: var(--ant-padding-xxs) var(--ant-padding-xs);
      }
    }
  }

  /* 4. Выпадающие списки (Pickers) */
  .ql-picker {
    color: var(--ant-color-text);
    font-size: var(--ant-font-size-sm);
    height: var(--ant-control-height-sm);

    .ql-picker-label {
      border-radius: var(--ant-border-radius-sm);
      padding: 0 var(--ant-padding-xs) !important;
      transition: all var(--ant-motion-duration-mid);
      border: var(--ant-line-width) var(--ant-line-type) transparent !important;

      &:hover {
        color: var(--ant-color-primary-hover) !important;
        background-color: var(--ant-color-bg-text-hover);
      }
    }

    &.ql-expanded .ql-picker-label {
      border-color: var(--ant-color-primary) !important;
      color: var(--ant-color-primary) !important;
    }

    .ql-picker-options {
      background-color: var(--ant-color-bg-elevated);
      border: none !important;
      box-shadow: var(--ant-box-shadow-secondary);
      border-radius: var(--ant-border-radius-lg);
      padding: var(--ant-padding-xxs) !important;
      z-index: var(--ant-z-index-popup-base);
    }

    .ql-picker-item {
      border-radius: var(--ant-border-radius-xs);
      padding: var(--ant-padding-xxs) var(--ant-padding-sm) !important;
      transition: background var(--ant-motion-duration-fast);

      &:hover {
        background-color: var(--ant-control-item-bg-hover);
        color: var(--ant-color-primary-text-hover) !important;
      }
      &.ql-selected {
        color: var(--ant-color-primary-text) !important;
        background-color: var(--ant-control-item-bg-active);
      }
    }
  }

  /* 5. Тултипы (Links/Video/Formula) */
  .ql-tooltip {
    background-color: var(--ant-color-bg-elevated);
    border: none !important;
    box-shadow: var(--ant-box-shadow);
    border-radius: var(--ant-border-radius-lg);
    padding: var(--ant-padding-sm) !important;
    color: var(--ant-color-text);
    z-index: var(--ant-z-index-popup-base);

    input[type=text] {
      border: var(--ant-border-base) !important;
      border-radius: var(--ant-border-radius-sm);
      height: var(--ant-control-height-sm);
      padding: 0 var(--ant-padding-xs);
      background: var(--ant-color-bg-container);
      color: var(--ant-color-text);
      outline: none;
      transition: all var(--ant-motion-duration-mid);

      &:focus {
        border-color: var(--ant-color-primary) !important;
        box-shadow: 0 0 0 var(--ant-control-outline-width) var(--ant-control-outline);
      }
    }

    a {
      color: var(--ant-color-link);
      &:hover { color: var(--ant-color-link-hover); }
    }
    
    .ql-action::after {
      border-right: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary);
    }
  }
}
