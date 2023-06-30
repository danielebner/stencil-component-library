import { Component, Element, Event, EventEmitter, State, Prop, h, Host, ComponentInterface } from '@stencil/core';
import { getElements, isTextNode } from '../../utils/utils';
type HwChangeEvent = {
  value: any;
  index: number;
};

@Component({
  tag: 'hw-tabs',
  shadow: false,
})
export class HwTabs implements ComponentInterface {
  @Element() el: HTMLElement;

  @Event({
    eventName: 'change',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  change: EventEmitter;

  @Prop({
    mutable: true,
    reflect: true,
  })
  value;

  @State() tabs: Array<Element> = [];
  @State() tabPanels: Array<Element> = [];
  @State() indexSelected = 0;

  changeHandler(hwChangeEvent: HwChangeEvent) {
    this.change.emit(hwChangeEvent);
  }

  connectedCallback() {
    this.tabs = getElements(this.el, 'hw-tab');
    this.indexSelected = this.tabs.findIndex(tab => tab.getAttribute('selected') !== null);
    this.tabPanels = getElements(this.el, 'hw-tab-panel');
    this.el.innerHTML = '';
  }

  renderButton(tab: Element, index: number) {
    const childNode: Node = tab.childNodes[0];
    const element: any = childNode as any;
    const TagName: string = isTextNode(childNode) ? 'button' : element.tagName;
    const inner: string = isTextNode(childNode) ? tab.innerHTML : element.innerHTML;
    const attributes = Array.from(tab.attributes);
    const filteredAttributes = attributes.filter(attribute => attribute.name !== 'value' && attribute.name !== 'selected');
    const attributesObject = filteredAttributes.reduce((result, attribute) => {
      result[attribute.name] = attribute.value;
      return result;
    }, {});

    return (
      <TagName
        {...attributesObject}
        data-index={index}
        data-value={tab.getAttribute('value')}
        onClick={event => {
          const clickedElement = event.target as HTMLElement;
          this.indexSelected = parseInt(clickedElement.dataset.index, 10);
          const { value } = clickedElement.dataset;
          this.value = clickedElement.dataset.value;
          this.changeHandler({ value, index });
        }}
        innerHTML={inner}
      ></TagName>
    );
  }

  renderButtons() {
    return this.tabs.map((tab: Element, index: number) => this.renderButton(tab, index));
  }

  renderPanels() {
    return this.tabPanels.map((tabPanel, index) => {
      const style = {
        display: index === this.indexSelected ? 'block' : 'none',
      };
      return <div style={style} innerHTML={tabPanel.innerHTML}></div>;
    });
  }

  render() {
    return (
      <Host>
        {this.renderButtons()}
        {this.renderPanels()}
      </Host>
    );
  }
}
