111

.ql-table-border-shadow,
.ql-table-select-container,
.ql-table-dropdown-list,
.ql-table-dropdown-properties-list,
.ql-table-menus-container,
.ql-table-properties-form,
.ql-table-color-container .color-picker .color-picker-select {
  border-radius: var(--ant-border-radius) !important;
  border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary) !important;
  background: var(--ant-color-bg-elevated) !important;
  box-shadow: var(--ant-box-shadow-secondary) !important;
  color: var(--ant-color-text) !important;
  font-family: var(--ant-font-family) !important;
}

.ql-table-input,
.ql-table-dropdown-properties,
.ql-table-color-container .label-field-view-color .property-input,
.ql-table-properties-form .property-input {
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

.ql-table-properties-form {
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

.ql-table-dropdown:hover,
.ql-table-dropdown-properties:hover,
.ql-table-dropdown-list li:hover,
.ql-table-dropdown-properties-list li:hover,
.ql-table-color-container .color-picker .color-picker-select .erase-container:hover {
  background-color: var(--ant-color-bg-text-hover) !important;
}

.ql-table-tooltip {
  background: var(--ant-color-bg-spotlight) !important;
  border-radius: var(--ant-border-radius-sm) !important;
  color: var(--ant-color-text-light-solid) !important;

  &::before {
    border-bottom-color: var(--ant-color-bg-spotlight) !important;
  }
}

.ql-table-tooltip-error {
  background: var(--ant-color-error) !important;
  border-radius: var(--ant-border-radius-sm) !important;

  &::before {
    border-bottom-color: var(--ant-color-error) !important;
  }
}

.ql-table-switch {
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

.ql-table-divider {
  background: var(--ant-color-border-secondary) !important;
}

.ql-table-disabled,
.ql-table-button-disabled {
  background: var(--ant-color-bg-container-disabled) !important;
  color: var(--ant-color-text-disabled) !important;
}

.ql-cell-selected,
.ql-cell-focused {
  &::after {
    background-color: var(--ant-color-primary-bg) !important;
    border: 1px solid var(--ant-color-primary-border-hover) !important;
  }
}

.ql-cell-focused::after {
  border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-primary) !important;
}

.label-field-view-error > input {
  border-color: var(--ant-color-error) !important;
}

.label-field-view-status {
  background: var(--ant-color-error) !important;
  border-radius: var(--ant-border-radius-sm) !important;

  &::before {
    border-bottom-color: var(--ant-color-error) !important;
  }
}

.ql-operate-line-container .ql-operate-line {
  background-color: var(--ant-color-primary) !important;
}
