import { Component, h, Host, ComponentInterface, Prop, Listen, Element } from '@stencil/core';
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
  selected = false;

  @Listen('tabClicked', { target: 'document' })
  // @Listen('tabsChanged', { target: 'document' })
  tabClicked(event: CustomEvent) {
    this.handleSelection(event.detail.index);
  }

  handleSelection(clickedIndex) {
    if (clickedIndex === this.getIndex()) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  getIndex() {
    const tabPanels = getElements(this.el.parentNode, 'pxw-tab-panel');
    const index = tabPanels.findIndex(tabPanel => tabPanel === this.el);
    return index;
  }

  render() {
    const style = this.selected ? { display: 'block' } : { display: 'none' };

    return (
      <Host style={style}>
        <slot></slot>
      </Host>
    );
  }
}
