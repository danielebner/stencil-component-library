import { Component, h, Host, ComponentInterface, Element, State, Event, EventEmitter, Prop, Listen } from '@stencil/core';
import { getElements } from '../../utils/utils';

@Component({
  tag: 'pxw-tabs',
  shadow: false,
})
export class Tabs implements ComponentInterface {
  @Element() el: HTMLElement;

  @Event({
    eventName: 'tabsChanged',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tabsChanged: EventEmitter;

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
    this.indexSelected = this.tabs.findIndex(tab => tab.getAttribute('selected') !== null);
  }

  @Listen('tabClicked')
  tabClicked(event) {
    const { index } = event.detail;
    if (index !== this.indexSelected) {
      this.indexSelected = index;
      const tab = this.tabs[index];
      this.value = tab.getAttribute('value');
      this.tabsChanged.emit({ index });
    }
  }
  render() {
    return (
      <Host>
        {/* onClick={event => this.clickHandler(event)}> */}
        <slot></slot>
      </Host>
    );
  }
}
