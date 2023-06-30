import { Component, Element, Event, EventEmitter, State, Prop, h, Host, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'hw-step-first',
  shadow: false,
})
export class HwTabs implements ComponentInterface {
  @Element() el: HTMLElement;

  @Event({
    eventName: 'hwTriggerFirstStep',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  hwTriggerFirstStep: EventEmitter;

  clickHandler() {
    console.log('first clicked');
    this.hwTriggerFirstStep.emit();
  }

  render() {
    return (
      <button class="hw-step-first" onClick={() => this.clickHandler()}>
        <slot />
      </button>
    );
  }
}
