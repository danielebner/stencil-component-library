import { Component, h, Host, ComponentInterface, Element, Prop, Event, EventEmitter, Listen } from '@stencil/core';
import { getElements } from '../../utils/utils';

@Component({
  tag: 'pxw-tab',
  shadow: false,
})
export class Tab implements ComponentInterface {
  @Element() el: HTMLElement;

  @Prop() value;

  @Prop({
    mutable: true,
    reflect: true,
  })
  selected;

  @Event({
    eventName: 'tabClicked',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tabClicked: EventEmitter;

  connectedCallback() {
    if (this.isSelected()) {
      this.handleClicked();
    }
  }

  @Listen('tabsChanged', { target: 'document' })
  handleTabClicked(event: CustomEvent) {
    this.handleSelected(event.detail.index);
  }

  getIndex() {
    const tabPanels = getElements(this.el.parentNode, 'pxw-tab');
    const index = tabPanels.findIndex(tabPanel => tabPanel === this.el);
    return index;
  }

  handleSelected(clickedIndex) {
    if (clickedIndex === this.getIndex()) {
      this.selected = '';
    } else {
      this.selected = null;
    }
  }

  handleClicked = () => {
    this.tabClicked.emit({ index: this.getIndex(), value: this.value });
  };

  isSelected() {
    return this.selected === null || this.selected === undefined;
  }

  render() {
    const style = this.isSelected ? {} : { fontWeight: 'bold' };

    return (
      <Host style={style} onClick={() => this.handleClicked()}>
        <slot></slot>
      </Host>
    );
  }
}
