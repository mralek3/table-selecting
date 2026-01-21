/* quill-overrides.css */

:root {
  /* Базовые цвета и шрифты */
  .ql-container.ql-snow, 
  .ql-toolbar.ql-snow {
    font-family: var(--ant-font-family) !important;
    font-size: var(--ant-font-size) !important;
    border-color: var(--ant-color-border-separator) !important;
  }

  /* Контейнер редактора */
  .ql-container.ql-snow {
    background-color: var(--ant-color-bg-container) !important;
    color: var(--ant-color-text) !important;
    border-bottom-left-radius: var(--ant-border-radius) !important;
    border-bottom-right-radius: var(--ant-border-radius) !important;
    transition: border-color var(--ant-motion-duration-slow) !important;

    .ql-editor {
      line-height: var(--ant-line-height) !important;
      padding: var(--ant-padding-content-vertical) var(--ant-padding-content-horizontal) !important;

      &.ql-blank::before {
        color: var(--ant-color-text-placeholder) !important;
        font-style: normal !important;
      }

      /* Стили заголовков внутри текста */
      h1, h2, h3, h4, h5, h6 {
        color: var(--ant-color-text-heading) !important;
        font-weight: var(--ant-font-weight-strong) !important;
      }

      /* Ссылки */
      a {
        color: var(--ant-color-link) !important;
        text-decoration: none !important;
        &:hover {
          color: var(--ant-color-link-hover) !important;
        }
      }

      /* Цитаты и код */
      blockquote {
        border-left: 4px solid var(--ant-color-border) !important;
        padding-left: var(--ant-padding-md) !important;
        color: var(--ant-color-text-description) !important;
      }

      pre.ql-code-block-container {
        background-color: var(--ant-color-fill-tertiary) !important;
        border-radius: var(--ant-border-radius-sm) !important;
        padding: var(--ant-padding-xs) !important;
        color: var(--ant-color-text-code) !important;
      }
    }
  }

  /* Тулбар (Панель инструментов) */
  .ql-toolbar.ql-snow {
    background-color: var(--ant-color-bg-container) !important;
    border-top-left-radius: var(--ant-border-radius) !important;
    border-top-right-radius: var(--ant-border-radius) !important;
    padding: 8px !important;

    /* Кнопки в стиле AntD Button (type="link") */
    button, .ql-picker-label {
      border-radius: var(--ant-border-radius-sm) !important;
      color: var(--ant-color-text) !important;
      transition: all var(--ant-motion-duration-mid) !important;

      .ql-stroke {
        stroke: var(--ant-color-text) !important;
      }
      .ql-fill {
        fill: var(--ant-color-text) !important;
      }

      &:hover {
        color: var(--ant-color-primary-hover) !important;
        background-color: var(--ant-control-item-bg-hover) !important;
        
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

    /* Выпадающие списки (Select) */
    .ql-picker {
      color: var(--ant-color-text) !important;
      
      .ql-picker-options {
        background-color: var(--ant-color-bg-elevated) !important;
        border-radius: var(--ant-border-radius-lg) !important;
        box-shadow: var(--ant-box-shadow-secondary) !important;
        border: none !important;
        padding: 4px !important;

        .ql-picker-item {
          border-radius: var(--ant-border-radius-sm) !important;
          padding: 4px 8px !important;
          
          &:hover {
            background-color: var(--ant-control-item-bg-hover) !important;
            color: var(--ant-color-primary) !important;
          }
          
          &.ql-selected {
            color: var(--ant-color-primary) !important;
            background-color: var(--ant-control-item-bg-active) !important;
          }
        }
      }
    }
  }

  /* Тултипы и всплывающие окна (например, ввод ссылки) */
  .ql-snow .ql-tooltip {
    background-color: var(--ant-color-bg-elevated) !important;
    border-radius: var(--ant-border-radius-lg) !important;
    box-shadow: var(--ant-box-shadow-secondary) !important;
    border: 1px solid var(--ant-color-border-secondary) !important;
    color: var(--ant-color-text) !important;
    padding: 8px 12px !important;
    z-index: var(--ant-z-index-popup) !important;

    input[type=text] {
      border: 1px solid var(--ant-color-border) !important;
      border-radius: var(--ant-border-radius-sm) !important;
      padding: 4px 8px !important;
      font-size: var(--ant-font-size) !important;
      outline: none !important;

      &:focus {
        border-color: var(--ant-color-primary) !important;
        box-shadow: 0 0 0 2px var(--ant-color-primary-outline) !important;
      }
    }

    a.ql-action::after {
      content: 'OK' !important;
      color: var(--ant-color-primary) !important;
      font-weight: bold !important;
    }

    a.ql-preview {
      color: var(--ant-color-link) !important;
    }
  }

  /* Скроллбар (опционально под AntD) */
  .ql-editor::-webkit-scrollbar {
    width: 6px !important;
  }
  .ql-editor::-webkit-scrollbar-thumb {
    background: var(--ant-color-fill-secondary) !important;
    border-radius: var(--ant-border-radius-pill) !important;
  }
}
