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
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  triggerChangeStep: EventEmitter;

  @Event()
  change: EventEmitter;

  @Listen('change', { target: 'document' })
  debug(_event: CustomEvent) {
    console.log('heard');
  }

  getChangeEvent() {
    const step = this.steps[this.indexSelected];
    const title = step.getAttribute('title');
    return { index: this.indexSelected, title };
  }

  @Listen('triggerLastStep', { target: 'document' })
  triggerLastStep(_event: CustomEvent) {
    if (this.indexSelected + 1 < this.count) {
      this.indexSelected = this.count - 1;
      this.triggerChangeStep.emit({ index: this.indexSelected });
      this.change.emit(this.getChangeEvent());
    } else {
      console.error('Already on Last Step');
    }
  }

  @Listen('triggerNextStep', { target: 'document' })
  triggerNextStep(_event: CustomEvent) {
    if (this.indexSelected + 1 < this.count) {
      this.indexSelected++;
      this.triggerChangeStep.emit({ index: this.indexSelected });
      this.change.emit(this.getChangeEvent());
    } else {
      console.error('No next step');
    }
  }

  @Listen('triggerPreviousStep', { target: 'document' })
  triggerPreviousStep(_event: CustomEvent) {
    if (this.indexSelected > 0) {
      this.indexSelected--;
      this.triggerChangeStep.emit({ index: this.indexSelected });
      this.change.emit(this.getChangeEvent());
    } else {
      console.error('No previous step');
    }
  }

  @Listen('triggerFirstStep', { target: 'document' })
  triggerPreviousFirst(_event: CustomEvent) {
    if (this.indexSelected > 0) {
      this.indexSelected = 0;
      this.triggerChangeStep.emit({ index: 0 });
      this.change.emit(this.getChangeEvent());
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
