import { Component, h, Host, ComponentInterface, Prop } from '@stencil/core';

@Component({
  tag: 'pxw-step',
  shadow: false,
})
export class Steps implements ComponentInterface {
  @Prop({
    mutable: true,
    reflect: true,
  })
  visible = false;

  render() {
    const visibility = this.visible ? { display: 'block' } : { display: 'none' };

    return (
      <Host style={visibility}>
        <slot></slot>
      </Host>
    );
  }
}
