import { Component, h, Host, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'pxw-steps',
  shadow: false,
})
export class Steps implements ComponentInterface {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
