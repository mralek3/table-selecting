888

.ql-table {
  &-border-shadow,
  &-select-container,
  &-dropdown-list,
  &-dropdown-properties-list,
  &-menus-container,
  &-properties-form,
  &-color-container .color-picker .color-picker-select {
    border-radius: var(--ant-border-radius);
    border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary);
    background: var(--ant-color-bg-elevated);
    box-shadow: var(--ant-box-shadow-secondary);
    color: var(--ant-color-text);
    font-family: var(--ant-font-family);
  }

  &-input,
  &-dropdown-properties,
  &-color-container .label-field-view-color .property-input,
  &-properties-form .property-input {
    border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border);
    border-radius: var(--ant-border-radius-sm);
    background: transparent;
    color: var(--ant-color-text);
    transition: all var(--ant-motion-duration-mid);

    &:focus {
      border-color: var(--ant-color-primary);
      box-shadow: 0 0 0 var(--ant-control-outline-width) var(--ant-control-outline);
      outline: none;
    }
  }

  &-properties-form {
    .properties-form-header {
      border-bottom: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary);
      color: var(--ant-color-text-heading);
      font-weight: var(--ant-font-weight-strong);
    }

    .properties-form-action-row > button {
      background: var(--ant-color-bg-container);
      border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border);
      border-radius: var(--ant-border-radius-sm);
      color: var(--ant-color-text);
      transition: all var(--ant-motion-duration-fast);

      &:hover {
        background: var(--ant-color-bg-text-hover);
        color: var(--ant-color-primary-text-hover);
      }
    }

    .properties-form-row .ql-table-check-container .ql-table-tooltip-hover:hover {
      background-color: var(--ant-color-bg-text-hover);
    }
  }

  &-dropdown,
  &-dropdown-properties,
  &-dropdown-list li,
  &-dropdown-properties-list li {
    &:hover {
      background-color: var(--ant-color-bg-text-hover);
    }
  }

  &-tooltip {
    background: var(--ant-color-bg-spotlight);
    border-radius: var(--ant-border-radius-sm);
    color: var(--ant-color-text-light-solid);

    &::before {
      border-bottom-color: var(--ant-color-bg-spotlight) !important;
    }

    &-error {
      background: var(--ant-color-error);
      border-radius: var(--ant-border-radius-sm);

      &::before {
        border-bottom-color: var(--ant-color-error) !important;
      }
    }
  }

  &-switch {
    .ql-table-switch-inner {
      background: var(--ant-color-fill-tertiary);
      border-radius: 100px;

      &[aria-checked="true"] {
        background: var(--ant-color-primary);
      }

      &:before {
        background: var(--ant-color-switch-handle);
      }
    }
  }

  &-divider {
    background: var(--ant-color-border-secondary);
  }

  &-disabled,
  &-button-disabled {
    background: var(--ant-color-bg-container-disabled) !important;
    color: var(--ant-color-text-disabled);
  }
}

.ql-cell {
  &-selected,
  &-focused {
    &::after {
      background-color: var(--ant-color-primary-bg);
      border: 1px solid var(--ant-color-primary-border-hover);
    }
  }

  &-focused::after {
    border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-primary);
  }
}

.label-field-view {
  &-error > input {
    border-color: var(--ant-color-error) !important;
  }

  &-status {
    background: var(--ant-color-error);
    border-radius: var(--ant-border-radius-sm);

    &::before {
      border-bottom-color: var(--ant-color-error) !important;
    }
  }
}

.ql-operate-line-container .ql-operate-line {
  background-color: var(--ant-color-primary);
}
