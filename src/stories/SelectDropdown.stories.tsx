import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { SelectDropdown, SelectOption, SelectProps } from './SelectDropdown';
import './SelectDropdown.module.css'; // Import the CSS module for styling
import React from 'react';

// Define the default export for the Storybook metadata
const meta: Meta<typeof SelectDropdown> = {
  title: 'Components/SelectDropdown',
  component: SelectDropdown,
  argTypes: {
    id: { control: 'text' },
    withSearch: { control: 'boolean' },
    options: { control: 'object' },
    multiple: { control: 'boolean' },
    optionLabel: { control: 'text' },
    onChange: { action: 'changed' },
    outlined: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

// Sample options for the dropdown
const options: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

// Define the type for the arguments of the Template
interface SelectDropdownStoryProps extends Omit<SelectProps, 'value'> {
  value: SelectOption | SelectOption[] | undefined;
  multiple: boolean;
}

// Template function for creating stories
const Template: StoryFn<SelectDropdownStoryProps> = (args) => {
  // Initialize selected state based on whether multiple selection is allowed
  const [selected, setSelected] = useState<SelectOption | SelectOption[] | undefined>(
    args.multiple ? [] : undefined
  );

  // Handle value updates based on whether multiple selections are allowed
  const handleChange = (value: SelectOption | SelectOption[] | undefined) => {
    setSelected(value);
  };

  return (
    <SelectDropdown
      {...args}
      value={selected}
      onChange={handleChange}
      options={options}
    />
  );
};

// Single Select Story
export const SingleSelect = Template.bind({});
SingleSelect.args = {
  id: 'sdd-1',
  withSearch: false,
  options: options,
  multiple: false,
  optionLabel: 'Label',
  onChange: undefined,
  outlined: true,
  disabled: false,
};

// Multiple Select Story
export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  id: 'sdd-1',
  withSearch: true,
  options: options,
  multiple: true,
  optionLabel: 'Label',
  onChange: undefined,
  outlined: true,
  disabled: false,
};

// Disabled Story
export const Disabled = Template.bind({});
Disabled.args = {
  id: 'sdd-1',
  withSearch: true,
  options: options,
  multiple: false,
  optionLabel: 'Label',
  onChange: undefined,
  outlined: true,
  disabled: true,
};

// No Search Story
export const NoSearch = Template.bind({});
NoSearch.args = {
  id: 'sdd-1',
  withSearch: false,
  options: options,
  multiple: false,
  optionLabel: 'Label',
  onChange: undefined,
  outlined: true,
  disabled: false,
};
