import { Component, h, Host, ComponentInterface, Element, State, Event, EventEmitter, Prop } from '@stencil/core';
import { getElements } from '../../utils/utils';

@Component({
  tag: 'pxw-tabs',
  shadow: false,
})
export class Tabs implements ComponentInterface {
  @Element() el: HTMLElement;

  @Event({
    eventName: 'tabClicked',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tabClicked: EventEmitter;

  @Prop({
    mutable: true,
    reflect: true,
  })
  value;

  @State()
  tabs: Array<Element> = [];
  @State() indexSelected = 0;

  connectedCallback() {
    this.tabs = getElements(this.el, 'pxw-tab');
  }

  clickHandler(event) {
    const index = this.tabs.findIndex(tab => event.target === tab);
    this.tabClicked.emit({ index });
    const tab = this.tabs.find(tab => event.target === tab);
    this.value = tab.getAttribute('value');
  }

  render() {
    return (
      <Host onClick={event => this.clickHandler(event)}>
        <slot></slot>
      </Host>
    );
  }
}
