777

/* quill-table-better-overrides.css */

/* 1. ВЫДЕЛЕНИЕ ЯЧЕЕК И ФОКУС */
.ql-cell-selected-after,
.ql-cell-selected::after,
.ql-cell-focused::after {
  background-color: var(--ant-color-primary-bg) !important; /* Легкий основной фон AntD */
  opacity: 0.6 !important;
}

.ql-cell-focused::after {
  border: 1px solid var(--ant-color-primary) !important;
}

/* 2. КОНТЕЙНЕРЫ (Меню, выпадающие списки, формы свойств) */
.ql-table-border-shadow,
.ql-table-select-container,
.ql-table-dropdown-list,
.ql-table-dropdown-properties-list,
.ql-table-menus-container,
.ql-table-properties-form {
  border-radius: var(--ant-border-radius-lg) !important;
  border: 1px solid var(--ant-color-border-secondary) !important;
  background: var(--ant-color-bg-elevated) !important;
  box-shadow: var(--ant-box-shadow-secondary) !important;
  color: var(--ant-color-text) !important;
}

/* 3. ИНПУТЫ И ПОЛЯ ВВОДА */
.ql-table-input,
.ql-table-color-container .label-field-view-color .property-input,
.ql-table-properties-form .property-input,
.ql-table-dropdown-properties {
  border: 1px solid var(--ant-color-border) !important;
  border-radius: var(--ant-border-radius-sm) !important;
  background: var(--ant-color-bg-container) !important;
  color: var(--ant-color-text) !important;
  transition: all var(--ant-motion-duration-mid) !important;

  &:focus, &.ql-table-input-focus {
    border-color: var(--ant-color-primary) !important;
    box-shadow: 0 0 0 2px var(--ant-color-primary-outline) !important;
    outline: none !important;
  }

  &::placeholder {
    color: var(--ant-color-text-placeholder) !important;
  }
}

/* 4. ВЫПАДАЮЩИЕ СПИСКИ И ЭЛЕМЕНТЫ МЕНЮ */
.ql-table-dropdown-list, .ql-table-dropdown-properties-list {
  padding: 4px !important;

  li {
    border-radius: var(--ant-border-radius-sm) !important;
    color: var(--ant-color-text) !important;
    transition: background var(--ant-motion-duration-mid) !important;
    line-height: 32px !important;

    &:hover {
      background-color: var(--ant-control-item-bg-hover) !important;
    }
  }

  .ql-table-header-row {
    font-weight: var(--ant-font-weight-strong) !important;
    color: var(--ant-color-text-heading) !important;
    border-bottom: 1px solid var(--ant-color-border-split) !important;
  }
}

/* 5. ТУЛТИПЫ (Подсказки) */
.ql-table-tooltip {
  background: var(--ant-color-bg-spotlight) !important; /* Темный фон AntD Tooltip */
  border-radius: var(--ant-border-radius) !important;
  color: #fff !important;
  font-size: var(--ant-font-size-sm) !important;

  &::before {
    border-bottom-color: var(--ant-color-bg-spotlight) !important;
  }
}

/* 6. ОШИБКИ */
.ql-table-tooltip-error, .label-field-view-status {
  background: var(--ant-color-error) !important;
  border-radius: var(--ant-border-radius) !important;

  &::before {
    border-bottom-color: var(--ant-color-error) !important;
  }
}

.label-field-view-error > input {
  border-color: var(--ant-color-error) !important;
  &:focus {
    box-shadow: 0 0 0 2px var(--ant-color-error-outline) !important;
  }
}

/* 7. ФОРМА СВОЙСТВ (Properties Form) */
.ql-table-properties-form {
  .properties-form-header {
    border-bottom: 1px solid var(--ant-color-border-split) !important;
    background: var(--ant-color-fill-alter) !important;
    color: var(--ant-color-text-heading) !important;
    font-weight: var(--ant-font-weight-strong) !important;
    border-top-left-radius: var(--ant-border-radius-lg) !important;
    border-top-right-radius: var(--ant-border-radius-lg) !important;
  }

  .properties-form-action-row {
    border-top: 1px solid var(--ant-color-border-split) !important;
    padding: 12px !important;

    button {
      border-radius: var(--ant-border-radius-sm) !important;
      background: var(--ant-color-bg-container) !important;
      border: 1px solid var(--ant-color-border) !important;
      transition: all var(--ant-motion-duration-mid) !important;

      &:hover {
        color: var(--ant-color-primary) !important;
        border-color: var(--ant-color-primary) !important;
        background: var(--ant-color-bg-container) !important;
      }

      &[disabled] {
        color: var(--ant-color-text-disabled) !important;
        background: var(--ant-color-bg-container-disabled) !important;
        border-color: var(--ant-color-border) !important;
      }
    }
  }
}

/* 8. ПЕРЕКЛЮЧАТЕЛЬ (Switch) */
.ql-table-switch {
  .ql-table-switch-inner {
    background: var(--ant-color-text-quaternary) !important;
    
    &[aria-checked=true] {
      background: var(--ant-color-primary) !important;
    }

    &:before {
      box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2) !important;
    }
  }
}

/* 9. УПРАВЛЯЮЩИЕ ЭЛЕМЕНТЫ (Resize lines/blocks) */
.ql-operate-line-container .ql-operate-line {
  background-color: var(--ant-color-primary) !important;
}

.ql-operate-block {
  border-color: var(--ant-color-primary) !important;
  background: var(--ant-color-bg-container) !important;
}

/* 10. ВЫБОР ЦВЕТА (Color Picker) */
.ql-table-color-container {
  border-color: var(--ant-color-border) !important;
  border-radius: var(--ant-border-radius-sm) !important;

  .color-picker {
    border-left: 1px solid var(--ant-color-border) !important;
    
    .color-button {
      border-radius: 2px !important;
      border-color: var(--ant-color-border-secondary) !important;
    }

    .color-picker-select {
      background: var(--ant-color-bg-elevated) !important;
      border-radius: var(--ant-border-radius-lg) !important;
      box-shadow: var(--ant-box-shadow-secondary) !important;
      border: 1px solid var(--ant-color-border-secondary) !important;

      .erase-container:hover {
        background-color: var(--ant-control-item-bg-hover) !important;
      }
    }
  }
}

/* 11. ТАБЛИЦА В ТЕКСТЕ */
.ql-editor {
  table {
    border-color: var(--ant-color-border) !important;
  }
  th {
    background: var(--ant-color-fill-alter) !important;
    border-color: var(--ant-color-border) !important;
    color: var(--ant-color-text-heading) !important;
    font-weight: var(--ant-font-weight-strong) !important;
  }
  td {
    border-color: var(--ant-color-border) !important;
  }
}

/* 12. ДЕЙСТВИЯ ПРИ ВЫБОРЕ */
.ql-table-check-container {
  border-radius: var(--ant-border-radius-sm) !important;
  border-color: var(--ant-color-border) !important;

  .ql-table-tooltip-hover:hover {
    background-color: var(--ant-control-item-bg-hover) !important;
  }

  .ql-table-btns-checked {
    background-color: var(--ant-color-primary-bg) !important;
    svg path {
      stroke: var(--ant-color-primary) !important;
    }
  }
}
