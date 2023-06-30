import { Component, Element, Event, EventEmitter, State, Prop, h, Host, ComponentInterface, Listen } from '@stencil/core';
import { getElements } from '../../utils/utils';

@Component({
  tag: 'hw-steps',
  shadow: false,
})
export class HwTabs implements ComponentInterface {
  @Element() el: HTMLElement;

  @State() steps: Array<Element> = [];
  @State() indexSelected = 0;
  @State() count = 0;

  @Listen('hwTriggerNextStep')
  triggerNextStep(event: CustomEvent) {
    if (this.indexSelected + 1 < this.count) {
      console.log('next step');
      this.indexSelected++;
    } else {
      console.error('No next step');
    }
  }

  @Listen('hwTriggerPreviousStep')
  triggerPreviousStep(event: CustomEvent) {
    if (this.indexSelected !== 0) {
      console.log('previous step');
      this.indexSelected--;
    } else {
      console.error('No previous step');
    }
  }

  @Listen('hwTriggerLastStep')
  triggerLastStep(event: CustomEvent) {
    if (this.indexSelected + 1 !== this.count) {
      this.indexSelected = this.count;
    } else {
      console.error('Already on last step');
    }
  }

  @Listen('hwTriggerFirstStep')
  triggerFirstStep(event: CustomEvent) {
    if (this.indexSelected !== 0) {
      console.error('first step');
      this.indexSelected = 0;
    } else {
      console.error('Already on first step');
    }
  }

  connectedCallback() {
    this.steps = getElements(this.el, 'hw-step');
    this.el.innerHTML = '';
    this.indexSelected = this.steps.findIndex(step => step.getAttribute('selected') !== null);
    this.count = this.steps.length;
  }

  renderSteps() {
    return this.steps.map((step, index) => (index === this.indexSelected ? <div innerHTML={step.innerHTML}></div> : null));
  }

  render() {
    return <Host>{this.renderSteps()}</Host>;
  }
}
