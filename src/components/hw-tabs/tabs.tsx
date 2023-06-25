import { h } from '@stencil/core';

export const Tabs = props => {
  const { tabs, tabPanels } = props;
  let indexSelected = 0;

  return (
    <div>
      {tabs.map((tab, index) => (
        <button
          data-index={index}
          onClick={event => {
            const element = event.target as HTMLElement;
            const indexCliecked = parseInt(element.dataset.index, 10);
            console.log('indexCliecked', indexCliecked);

            const customEvent = new Event('tabbed');
            element.dispatchEvent(customEvent);
          }}
        >
          {tab}
        </button>
      ))}
      {tabPanels.map((tabPanel, index) => {
        const style = {
          display: index === indexSelected ? 'block' : 'none',
        };
        return <div style={style}>{tabPanel}</div>;
      })}
    </div>
  );
};
