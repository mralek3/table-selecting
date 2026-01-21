.ql-container {
  font-size: var(--ant-font-size) !important;
  font-family: var(--ant-font-family) !important;
  color: var(--ant-color-text) !important;

  &.ql-snow {
    background: var(--ant-color-bg-container) !important;
    border: var(--ant-line-width) var(--ant-line-type) var(--ant-color-border) !important;
    border-radius: var(--ant-border-radius) !important;
  }
}

.ql-editor {
  background: var(--ant-color-bg-container) !important;
  color: var(--ant-color-text) !important;
  font-family: var(--ant-font-family) !important;
  font-size: var(--ant-font-size) !important;
  line-height: var(--ant-line-height) !important;

  &.ql-blank::before {
    color: var(--ant-color-text-placeholder) !important;
    font-style: normal !important;
  }

  td {
    border: 1px solid var(--ant-color-border) !important;
  }

  li[data-list='checked'] > .ql-ui,
  li[data-list='unchecked'] > .ql-ui {
    color: var(--ant-color-text-secondary) !important;
  }

  h1 {
    font-size: var(--ant-font-size-heading-1) !important;
    line-height: var(--ant-line-height-heading-1) !important;
  }

  h2 {
    font-size: var(--ant-font-size-heading-2) !important;
    line-height: var(--ant-line-height-heading-2) !important;
  }

  h3 {
    font-size: var(--ant-font-size-heading-3) !important;
    line-height: var(--ant-line-height-heading-3) !important;
  }

  h4 {
    font-size: var(--ant-font-size-heading-4) !important;
    line-height: var(--ant-line-height-heading-4) !important;
  }

  h5 {
    font-size: var(--ant-font-size-heading-5) !important;
    line-height: var(--ant-line-height-heading-5) !important;
  }

  h6 {
    font-size: var(--ant-font-size-sm) !important;
  }

  a {
    color: var(--ant-color-link) !important;
    text-decoration: var(--ant-link-decoration) !important;

    &:hover {
      color: var(--ant-color-link-hover) !important;
    }
  }

  blockquote {
    border-left: 4px solid var(--ant-color-border-secondary) !important;
    background: var(--ant-color-fill-tertiary) !important;
    color: var(--ant-color-text-secondary) !important;
  }

  code {
    background: var(--ant-color-fill-secondary) !important;
    color: var(--ant-color-text) !important;
    border-radius: var(--ant-border-radius-sm) !important;
    font-family: var(--ant-font-family-code) !important;
  }

  .ql-code-block-container {
    background: var(--ant-color-bg-elevated) !important;
    color: var(--ant-color-text) !important;
    border-radius: var(--ant-border-radius) !important;
    box-shadow: var(--ant-box-shadow-secondary) !important;
    font-family: var(--ant-font-family-code) !important;
  }

  .ql-bg-blue { background: var(--ant-blue-6) !important; }
  .ql-bg-red { background: var(--ant-red-6) !important; }
  .ql-bg-green { background: var(--ant-green-6) !important; }
  .ql-bg-yellow { background: var(--ant-yellow-6) !important; }
  .ql-bg-orange { background: var(--ant-orange-6) !important; }
  .ql-bg-purple { background: var(--ant-purple-6) !important; }
  .ql-bg-black { background: var(--ant-color-bg-base) !important; }

  .ql-color-blue { color: var(--ant-blue-6) !important; }
  .ql-color-red { color: var(--ant-red-6) !important; }
  .ql-color-green { color: var(--ant-green-6) !important; }
  .ql-color-yellow { color: var(--ant-yellow-6) !important; }
  .ql-color-orange { color: var(--ant-orange-6) !important; }
  .ql-color-purple { color: var(--ant-purple-6) !important; }
  .ql-color-white { color: var(--ant-color-white) !important; }

  ::selection {
    background: var(--ant-color-primary-bg) !important;
    color: var(--ant-color-text-light-solid) !important;
  }
}

.ql-toolbar.ql-snow {
  background: var(--ant-color-bg-layout) !important;
  border: 1px solid var(--ant-color-border) !important;
  border-radius: var(--ant-border-radius) var(--ant-border-radius) 0 0 !important;
  font-family: var(--ant-font-family) !important;

  & + .ql-container.ql-snow {
    border-top: 0 !important;
  }

  button {
    color: var(--ant-color-text) !important;

    &:hover,
    &:focus,
    &.ql-active {
      color: var(--ant-color-primary) !important;
    }
  }

  .ql-fill,
  .ql-stroke.ql-fill {
    fill: var(--ant-color-text) !important;
  }

  .ql-stroke {
    stroke: var(--ant-color-text) !important;
  }

  button:hover,
  button:focus,
  button.ql-active {
    .ql-fill {
      fill: var(--ant-color-primary) !important;
    }

    .ql-stroke {
      stroke: var(--ant-color-primary) !important;
    }
  }
}

.ql-snow {
  .ql-picker {
    color: var(--ant-color-text) !important;

    &-label {
      border-radius: var(--ant-border-radius-sm) !important;
    }

    &-options {
      background: var(--ant-color-bg-elevated) !important;
      border: 1px solid var(--ant-color-border) !important;
      box-shadow: var(--ant-box-shadow-secondary) !important;
      color: var(--ant-color-text) !important;
    }

    &.ql-expanded .ql-picker-label {
      color: var(--ant-color-primary) !important;
    }

    &-item:hover,
    &-item.ql-selected {
      color: var(--ant-color-primary) !important;
      background: var(--ant-color-fill-secondary) !important;
    }
  }
}

.ql-snow {
  .ql-tooltip {
    background: var(--ant-color-bg-elevated) !important;
    border: 1px solid var(--ant-color-border) !important;
    box-shadow: var(--ant-box-shadow-secondary) !important;
    color: var(--ant-color-text) !important;
    border-radius: var(--ant-border-radius) !important;

    input[type='text'] {
      background: var(--ant-color-bg-container) !important;
      border: 1px solid var(--ant-color-border) !important;
      color: var(--ant-color-text) !important;
    }

    a {
      color: var(--ant-color-link) !important;
    }
  }
}