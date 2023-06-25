import { Component, Element, State, h, Host } from '@stencil/core';
import { Tabs } from './tabs';

@Component({
  tag: 'hw-tabs',
  shadow: true,
})
export class HwTabs {
  @Element() el: HTMLElement;

  @State() tabs: Array<string> = [];
  @State() tabPanels: Array<string> = [];
  @State() indexSelected = 0;

  connectedCallback() {
    const hwTabList = this.el.querySelector('hw-tab-list');
    const hwTabNodeList = hwTabList.querySelectorAll('hw-tab');
    const hwTabArray = Array.prototype.slice.call(hwTabNodeList);
    this.tabs = hwTabArray.map(hwTab => {
      const tabContent = hwTab.innerHTML;
      return tabContent;
    });

    const hwTabPanels = this.el.querySelector('hw-tab-panels');
    const hwTabPanelNodeList = hwTabPanels.querySelectorAll('hw-tab-panel');
    const hwTabPanelArray = Array.prototype.slice.call(hwTabPanelNodeList);
    this.tabPanels = hwTabPanelArray.map(hwTab => {
      const tabPanelContent = hwTab.innerHTML;
      return tabPanelContent;
    });
  }
  render() {
    return (
      <Host class="hw-tabs" onClick={event => console.log('Tabs clicked', event)}>
        {/* <Tabs tabs={this.tabs} tabPanels={this.tabPanels} /> */}

        {this.tabs.map((tab, index) => (
          <button
            data-index={index}
            onClick={event => {
              const element = event.target as HTMLElement;
              this.indexSelected = parseInt(element.dataset.index, 10);
            }}
          >
            {tab}
          </button>
        ))}
        {this.tabPanels.map((tabPanel, index) => {
          const style = {
            display: index === this.indexSelected ? 'block' : 'none',
          };
          return <div style={style}>{tabPanel}</div>;
        })}
      </Host>
    );
  }
}
