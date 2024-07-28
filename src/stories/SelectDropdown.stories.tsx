import type { Meta, StoryObj } from '@storybook/react';
import { SelectDropdown } from './SelectDropdown';
import Select from "react-select";

const options = [
    { value: '0', label: 'Option 1' },
    { value: '1', label: 'Long Option 1' },
    { value: '2', label: 'Test Option 1' }
  ]

const meta = {
  title: 'Form/Select',
  component: SelectDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
  //args: { multiple: false },
} satisfies Meta<typeof SelectDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'sdd-1',
    withSeach: false,
    options: options,
    multiple: false,
    optionLabel: 'Label',
    onChange() {
        
    },
    outlined: false,
    disabled: false,
  },
};
