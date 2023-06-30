import { Component, Element, Event, EventEmitter, State, Prop, h, Host, ComponentInterface, getElement } from '@stencil/core';
import { getElements } from '../../utils/utils';

@Component({
  tag: 'hw-step-next',
  shadow: false,
})
export class HwTabs implements ComponentInterface {
  @Element() el: HTMLElement;

  @Event({
    eventName: 'hwTriggerNextStep',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  hwTriggerNextStep: EventEmitter;

  clickHandler() {
    this.hwTriggerNextStep.emit();
  }

  render() {
    console.log('RENDER BUTTON');
    return (
      <button class="hw-step-next" onClick={() => this.clickHandler()}>
        <slot />
      </button>
    );
  }
}
