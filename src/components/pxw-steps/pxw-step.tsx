import { Component, h, Host, ComponentInterface, Prop, Element, Listen } from '@stencil/core';
import { getElements } from '../../utils/utils';

@Component({
  tag: 'pxw-step',
  shadow: false,
})
export class Steps implements ComponentInterface {
  @Element() el: HTMLElement;

  @Prop({
    mutable: true,
    reflect: true,
  })
  selected;

  @Listen('triggerChangeStep', { target: 'document' })
  changeStep(event: CustomEvent) {
    this.handleSelection(event.detail.index);
  }

  isSelected() {
    return this.selected !== null && this.selected !== undefined;
  }

  getIndex() {
    const steps = getElements(this.el.parentNode, 'pxw-step');
    const index = steps.findIndex(tabPanel => tabPanel === this.el);
    return index;
  }

  handleSelection(clickedIndex) {
    if (clickedIndex === this.getIndex()) {
      this.selected = '';
    } else {
      this.selected = null;
    }
  }

  render() {
    const style = this.isSelected() ? {} : { display: 'none' };
    return (
      <Host style={style}>
        <slot></slot>
      </Host>
    );
  }
}
