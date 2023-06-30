import { Component, h, Host, ComponentInterface, Prop } from '@stencil/core';

@Component({
  tag: 'pxw-tab',
  shadow: false,
})
export class Tab implements ComponentInterface {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
