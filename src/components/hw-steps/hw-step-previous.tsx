import { Component, Element, Event, EventEmitter, State, Prop, h, Host, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'hw-step-previous',
  shadow: false,
})
export class HwTabs implements ComponentInterface {
  @Element() el: HTMLElement;

  @Event({
    eventName: 'hwTriggerPreviousStep',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  hwTriggerPreviousStep: EventEmitter;

  clickHandler() {
    this.hwTriggerPreviousStep.emit();
  }

  render() {
    return (
      <button class="hw-step-previous" onClick={() => this.clickHandler()}>
        <slot />
      </button>
    );
  }
}
