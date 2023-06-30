import { Component, h, Host, ComponentInterface, Listen, State, Element, Event, EventEmitter } from '@stencil/core';
import { getElements } from '../../utils/utils';
import { emit } from 'process';

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

  @Listen('triggerNextStep', { target: 'document' })
  triggerNextStep(_event: CustomEvent) {
    if (this.indexSelected + 1 < this.count) {
      console.log('...steps listened to triggerNextStep, will fire changeStep');
      this.indexSelected++;
      this.changeStep.emit({ index: this.indexSelected });
    } else {
      console.error('No next step');
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
