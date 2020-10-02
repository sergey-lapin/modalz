import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { ElementCard } from './Card';
const pt = require('periodic-table');
let elements = pt.elements;

export default {
  title: 'Example/ElementCard',
  component: ElementCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template = ({ params }: { params: any }) => {
  return <>
    {params.map((args: any) => {
      return <ElementCard {...args} />
    })}
  </>
}

export const Primary = Template.bind({}) as any
Primary.args = {
  primary: true,
  label: 'Card',
  params: Object.keys(elements).slice(0, 5).map((name) => {
    let element = elements[name];
    return { name: element.name, color: `#${element.cpkHexColor}` };
  })
};
