import { Component, h, Host, ComponentInterface, Prop, Listen, Element, State } from '@stencil/core';
import { getElements } from '../../utils/utils';

@Component({
  tag: 'pxw-tab-panel',
  shadow: false,
})
export class TabPanel implements ComponentInterface {
  @Element() el: HTMLElement;
  @Prop({
    mutable: true,
    reflect: true,
  })
  visible = false;

  @Listen('tabClicked', { target: 'document' })
  tabClicked(event: CustomEvent) {
    this.handleVisibility(event.detail.index);
  }

  handleVisibility(clickedIndex) {
    if (clickedIndex === this.getIndex()) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  getIndex() {
    const tabPanels = getElements(this.el.parentNode, 'pxw-tab-panel');
    const index = tabPanels.findIndex(tabPanel => tabPanel === this.el);
    return index;
  }

  render() {
    const visibility = this.visible ? { display: 'block' } : { display: 'none' };

    return (
      <Host style={visibility}>
        <slot></slot>
      </Host>
    );
  }
}
