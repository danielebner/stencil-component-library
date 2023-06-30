import { Component, h, Host, ComponentInterface, Element, Prop, Listen } from '@stencil/core';
import { getElements } from '../../utils/utils';

@Component({
  tag: 'pxw-tab',
  shadow: false,
})
export class Tab implements ComponentInterface {
  @Element() el: HTMLElement;

  @Prop() selected;

  @Listen('tabClicked', { target: 'document' })
  tabClicked(event: CustomEvent) {
    this.handleSelected(event.detail.index);
  }

  getIndex() {
    const tabPanels = getElements(this.el.parentNode, 'pxw-tab');
    const index = tabPanels.findIndex(tabPanel => tabPanel === this.el);
    return index;
  }

  handleSelected(clickedIndex) {
    console.log('handleSelected', this.getIndex(), clickedIndex);
    if (clickedIndex === this.getIndex()) {
      this.selected = true;
    } else {
      this.selected = undefined;
    }
  }

  render() {
    const style = this.selected !== undefined ? { color: 'aqua' } : {};
    return (
      <Host style={style}>
        <slot></slot>
      </Host>
    );
  }
}
