import { Component, h, Host, ComponentInterface, Listen, State, Element, Event, EventEmitter } from '@stencil/core';
import { getElements } from '../../utils/utils';

@Component({
  tag: 'pxw-steps',
  shadow: false,
})
export class Steps implements ComponentInterface {
  @Element() el: HTMLElement;

  @State() steps: Array<Element> = [];
  @State() indexSelected = 0;
  @State() count = 0;

  @Event({
    eventName: 'changeStep',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  changeStep: EventEmitter;

  @Listen('triggerLastStep', { target: 'document' })
  triggerLastStep(_event: CustomEvent) {
    if (this.indexSelected + 1 < this.count) {
      this.indexSelected = this.count - 1;
      this.changeStep.emit({ index: this.indexSelected });
    } else {
      console.error('Already on Last Step');
    }
  }

  @Listen('triggerNextStep', { target: 'document' })
  triggerNextStep(_event: CustomEvent) {
    if (this.indexSelected + 1 < this.count) {
      this.indexSelected++;
      this.changeStep.emit({ index: this.indexSelected });
    } else {
      console.error('No next step');
    }
  }

  @Listen('triggerPreviousStep', { target: 'document' })
  triggerPreviousStep(_event: CustomEvent) {
    if (this.indexSelected > 0) {
      this.indexSelected--;
      this.changeStep.emit({ index: this.indexSelected });
    } else {
      console.error('No previous step');
    }
  }

  @Listen('triggerFirstStep', { target: 'document' })
  triggerPreviousFirst(_event: CustomEvent) {
    if (this.indexSelected > 0) {
      this.indexSelected = 0;
      this.changeStep.emit({ index: 0 });
    } else {
      console.error('Already on step 0');
    }
  }

  connectedCallback() {
    this.steps = getElements(this.el, 'pxw-step');
    this.indexSelected = this.steps.findIndex(step => step.getAttribute('selected') !== null);
    this.count = this.steps.length;
  }
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
