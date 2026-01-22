999

.ql-table {
  &-border-shadow,
  &-select-container,
  &-dropdown-list,
  &-dropdown-properties-list,
  &-menus-container,
  &-properties-form,
  &-color-container .color-picker .color-picker-select {
    border-radius: var(--ant-border-radius) !important;
    border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary) !important;
    background: var(--ant-color-bg-elevated) !important;
    box-shadow: var(--ant-box-shadow-secondary) !important;
    color: var(--ant-color-text) !important;
    font-family: var(--ant-font-family) !important;
  }

  &-input,
  &-dropdown-properties,
  &-color-container .label-field-view-color .property-input,
  &-properties-form .property-input {
    border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border) !important;
    border-radius: var(--ant-border-radius-sm) !important;
    background: transparent !important;
    color: var(--ant-color-text) !important;
    transition: all var(--ant-motion-duration-mid) !important;

    &:focus {
      border-color: var(--ant-color-primary) !important;
      box-shadow: 0 0 0 var(--ant-control-outline-width) var(--ant-control-outline) !important;
      outline: none !important;
    }
  }

  &-properties-form {
    .properties-form-header {
      border-bottom: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary) !important;
      color: var(--ant-color-text-heading) !important;
      font-weight: var(--ant-font-weight-strong) !important;
    }

    .properties-form-action-row > button {
      background: var(--ant-color-bg-container) !important;
      border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border) !important;
      border-radius: var(--ant-border-radius-sm) !important;
      color: var(--ant-color-text) !important;
      transition: all var(--ant-motion-duration-fast) !important;

      &:hover {
        background: var(--ant-color-bg-text-hover) !important;
        color: var(--ant-color-primary-text-hover) !important;
      }
    }

    .properties-form-row .ql-table-check-container .ql-table-tooltip-hover:hover {
      background-color: var(--ant-color-bg-text-hover) !important;
    }
  }

  &-dropdown,
  &-dropdown-properties,
  &-dropdown-list li,
  &-dropdown-properties-list li {
    &:hover {
      background-color: var(--ant-color-bg-text-hover) !important;
    }
  }

  &-tooltip {
    background: var(--ant-color-bg-spotlight) !important;
    border-radius: var(--ant-border-radius-sm) !important;
    color: var(--ant-color-text-light-solid) !important;

    &::before {
      border-bottom-color: var(--ant-color-bg-spotlight) !important;
    }

    &-error {
      background: var(--ant-color-error) !important;
      border-radius: var(--ant-border-radius-sm) !important;

      &::before {
        border-bottom-color: var(--ant-color-error) !important;
      }
    }
  }

  &-switch {
    .ql-table-switch-inner {
      background: var(--ant-color-fill-tertiary) !important;
      border-radius: 100px !important;

      &[aria-checked="true"] {
        background: var(--ant-color-primary) !important;
      }

      &:before {
        background: var(--ant-color-switch-handle) !important;
      }
    }
  }

  &-divider {
    background: var(--ant-color-border-secondary) !important;
  }

  &-disabled,
  &-button-disabled {
    background: var(--ant-color-bg-container-disabled) !important;
    color: var(--ant-color-text-disabled) !important;
  }
}

.ql-cell {
  &-selected,
  &-focused {
    &::after {
      background-color: var(--ant-color-primary-bg) !important;
      border: 1px solid var(--ant-color-primary-border-hover) !important;
    }
  }

  &-focused::after {
    border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-primary) !important;
  }
}

.label-field-view {
  &-error > input {
    border-color: var(--ant-color-error) !important;
  }

  &-status {
    background: var(--ant-color-error) !important;
    border-radius: var(--ant-border-radius-sm) !important;

    &::before {
      border-bottom-color: var(--ant-color-error) !important;
    }
  }
}

.ql-operate-line-container .ql-operate-line {
  background-color: var(--ant-color-primary) !important;
}
