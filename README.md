/* quill-overrides.css */

.ql-snow, 
.ql-container.ql-snow, 
.ql-toolbar.ql-snow {
  font-family: var(--ant-font-family) !important;
  font-size: var(--ant-font-size) !important;
}

/* 1. ТУЛБАР (Верхний блок) — Статичный */
.ql-toolbar.ql-snow {
  border: 1px solid var(--ant-color-border) !important;
  border-bottom: none !important; /* Убираем нижнюю границу для стыковки */
  border-radius: var(--ant-border-radius) var(--ant-border-radius) 0 0 !important;
  margin-bottom: 0 !important;
  background-color: var(--ant-color-bg-container) !important;
  padding: 8px !important;

  /* Кнопки в стиле AntD variant="link" */
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
      .ql-stroke { stroke: var(--ant-color-primary-hover) !important; }
      .ql-fill { fill: var(--ant-color-primary-hover) !important; }
    }

    &.ql-active {
      color: var(--ant-color-primary) !important;
      .ql-stroke { stroke: var(--ant-color-primary) !important; }
      .ql-fill { fill: var(--ant-color-primary) !important; }
    }
  }

  .ql-picker {
    .ql-picker-options {
      background-color: var(--ant-color-bg-elevated) !important;
      border-radius: var(--ant-border-radius-lg) !important;
      box-shadow: var(--ant-box-shadow-secondary) !important;
      border: none !important;
    }
  }
}

/* 2. КОНТЕЙНЕР (Нижний блок) — Имитация AntD Input */
.ql-container.ql-snow {
  border: 1px solid var(--ant-color-border) !important;
  border-radius: 0 0 var(--ant-border-radius) var(--ant-border-radius) !important;
  background-color: var(--ant-color-bg-container) !important;
  transition: all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out) !important;

  /* Ховер только на контейнере */
  &:hover {
    border-color: var(--ant-color-primary-hover) !important;
    z-index: 2 !important;
  }

  /* Фокус на контейнере */
  &:has(.ql-editor:focus) {
    border-color: var(--ant-color-primary) !important;
    box-shadow: 0 0 0 2px var(--ant-color-primary-outline) !important;
    outline: none !important;
    z-index: 2 !important;
  }

  .ql-editor {
    padding: var(--ant-padding-content-vertical) var(--ant-padding-content-horizontal) !important;
    line-height: var(--ant-line-height) !important;
    color: var(--ant-color-text) !important;

    &.ql-blank::before {
      color: var(--ant-color-text-placeholder) !important;
      font-style: normal !important;
    }
  }
}

/* 3. ТУЛТИПЫ */
.ql-snow .ql-tooltip {
  background-color: var(--ant-color-bg-elevated) !important;
  border-radius: var(--ant-border-radius-lg) !important;
  box-shadow: var(--ant-box-shadow-secondary) !important;
  border: 1px solid var(--ant-color-border-secondary) !important;

  input[type=text] {
    border: 1px solid var(--ant-color-border) !important;
    border-radius: var(--ant-border-radius-sm) !important;
    &:focus {
      border-color: var(--ant-color-primary) !important;
      box-shadow: 0 0 0 2px var(--ant-color-primary-outline) !important;
      outline: none !important;
    }
  }
}
