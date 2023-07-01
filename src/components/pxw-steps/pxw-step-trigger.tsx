import { Component, Element, Event, EventEmitter, h, ComponentInterface, Host, Prop } from '@stencil/core';

@Component({
  tag: 'pxw-step-trigger',
  shadow: false,
})
export class StepTrigger implements ComponentInterface {
  @Element() el: HTMLElement;

  @Prop() action: 'first' | 'previous' | 'next' | 'last';

  @Event({
    eventName: 'triggerFirstStep',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  triggerFirstStep: EventEmitter;

  @Event({
    eventName: 'triggerPreviousStep',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  triggerPreviousStep: EventEmitter;

  @Event({
    eventName: 'triggerNextStep',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  triggerNextStep: EventEmitter;

  @Event({
    eventName: 'triggerLastStep',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  triggerLastStep: EventEmitter;

  clickHandler() {
    switch (this.action) {
      case 'first':
        this.triggerFirstStep.emit();
        break;
      case 'previous':
        this.triggerPreviousStep.emit();
        break;
      case 'next':
        this.triggerNextStep.emit();
        break;
      case 'last':
        this.triggerLastStep.emit();
        break;
    }
  }

  render() {
    return (
      <Host onClick={() => this.clickHandler()}>
        <slot />
      </Host>
    );
  }
}
