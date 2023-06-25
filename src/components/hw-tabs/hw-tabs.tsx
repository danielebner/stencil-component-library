import { Component, Element, Event, EventEmitter, State, Prop, h, Host, ComponentInterface } from '@stencil/core';
import { getElements, isTextNode } from '../../utils/utils';
type HwChangeEvent = {
  value: any;
  index: number;
};

@Component({
  tag: 'hw-tabs',
  styleUrl: 'hw-tabs.css',
  shadow: true,
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

  @State() tabs: Array<any> = [];
  @State() tabPanels: Array<any> = [];
  @State() indexSelected = 0;

  @Prop({
    mutable: true,
    reflect: true,
  })
  value;

  changeHandler(hwChangeEvent: HwChangeEvent) {
    this.change.emit(hwChangeEvent);
  }

  connectedCallback() {
    this.tabs = getElements(this.el, 'hw-tab');
    this.indexSelected = this.tabs.findIndex(tab => tab.getAttribute('selected') !== null);
    this.tabPanels = getElements(this.el, 'hw-tab-panel');
    // Remove ChildNodes
  }
  render() {
    return (
      <Host>
        {this.tabs.map((tab: Element, index: number) => {
          const childNode: Node = tab.childNodes[0];
          const element: any = childNode as any;
          const TagName: string = isTextNode(childNode) ? 'button' : element.tagName;
          const inner = isTextNode(childNode) ? tab.innerHTML : element.innerHTML;
          return (
            <TagName
              // TODO Copy all Attributes
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
        })}
        {this.tabPanels.map((tabPanel, index) => {
          const style = {
            display: index === this.indexSelected ? 'block' : 'none',
          };
          return <div style={style} innerHTML={tabPanel.innerHTML}></div>;
        })}
      </Host>
    );
  }
}
