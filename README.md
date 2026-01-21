/* quill-overrides.css */

/* Общие настройки шрифтов */
.ql-snow, 
.ql-container.ql-snow, 
.ql-toolbar.ql-snow {
  font-family: var(--ant-font-family) !important;
  font-size: var(--ant-font-size) !important;
}

/* 1. ПАНЕЛЬ ИНСТРУМЕНТОВ (ВЕРХНИЙ БЛОК) */
.ql-toolbar.ql-snow {
  border: 1px solid var(--ant-color-border) !important;
  border-bottom: none !important; /* Убираем нижнюю границу */
  border-radius: var(--ant-border-radius) var(--ant-border-radius) 0 0 !important; /* Скругление только сверху */
  margin-bottom: 0 !important; /* Никакого отступа */
  background-color: var(--ant-color-bg-container) !important;
  padding: 8px !important;
  transition: border-color var(--ant-motion-duration-mid) !important;

  /* Состояние Hover: подсвечиваем границу вместе с контейнером */
  &:hover, 
  &:has(+ .ql-container.ql-snow:hover) {
    border-color: var(--ant-color-primary-hover) !important;
  }

  /* Состояние Focus: когда в редакторе под тулбаром активен курсор */
  &:has(+ .ql-container.ql-snow .ql-editor:focus) {
    border-color: var(--ant-color-primary) !important;
  }

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

  /* Выпадающие списки (Select) */
  .ql-picker {
    .ql-picker-options {
      background-color: var(--ant-color-bg-elevated) !important;
      border-radius: var(--ant-border-radius-lg) !important;
      box-shadow: var(--ant-box-shadow-secondary) !important;
      border: none !important;
      padding: 4px !important;

      .ql-picker-item:hover {
        background-color: var(--ant-control-item-bg-hover) !important;
        color: var(--ant-color-primary) !important;
      }
    }
  }
}

/* 2. КОНТЕЙНЕР РЕДАКТОРА (НИЖНИЙ БЛОК) */
.ql-container.ql-snow {
  border: 1px solid var(--ant-color-border) !important;
  border-radius: 0 0 var(--ant-border-radius) var(--ant-border-radius) !important; /* Скругление только снизу */
  background-color: var(--ant-color-bg-container) !important;
  transition: all var(--ant-motion-duration-mid) var(--ant-motion-ease-in-out) !important;

  /* Эффект Hover как у AntD Input */
  &:hover {
    border-color: var(--ant-color-primary-hover) !important;
  }

  /* Эффект Focus как у AntD Input */
  &:has(.ql-editor:focus) {
    border-color: var(--ant-color-primary) !important;
    box-shadow: 0 0 0 2px var(--ant-color-primary-outline) !important;
    outline: none !important;
    z-index: 1 !important; /* Чтобы тень ложилась поверх соседних элементов */
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

/* 3. ВСПОМОГАТЕЛЬНЫЕ ЭЛЕМЕНТЫ */
.ql-snow .ql-tooltip {
  background-color: var(--ant-color-bg-elevated) !important;
  border-radius: var(--ant-border-radius-lg) !important;
  box-shadow: var(--ant-box-shadow-secondary) !important;
  border: 1px solid var(--ant-color-border-secondary) !important;
  color: var(--ant-color-text) !important;

  input[type=text] {
    border: 1px solid var(--ant-color-border) !important;
    border-radius: var(--ant-border-radius-sm) !important;
    outline: none !important;

    &:focus {
      border-color: var(--ant-color-primary) !important;
      box-shadow: 0 0 0 2px var(--ant-color-primary-outline) !important;
    }
  }
}
