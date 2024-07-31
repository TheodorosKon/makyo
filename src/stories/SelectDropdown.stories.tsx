// stories.tsx
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { SelectDropdown, SelectOption } from './SelectDropdown';
import './SelectDropdown.module.css'; // Import CSS for Storybook

const meta: Meta<typeof SelectDropdown> = {
  title: 'Components/SelectDropdown',
  component: SelectDropdown,
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;

const options: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

type SelectDropdownProps = React.ComponentProps<typeof SelectDropdown>;

const Template: StoryFn<SelectDropdownProps> = (args) => {
  const [value, setValue] = useState<SelectOption[]>(args.multiple ? [] : undefined);

  const handleChange = (newValue: SelectOption | SelectOption[] | undefined) => {
    if (args.multiple) {
      setValue(newValue as SelectOption[]);
    } else {
      setValue(newValue as SelectOption | undefined);
    }
  };

  return (
    <SelectDropdown
      {...args}
      value={value}
      onChange={handleChange}
      options={options}
    />
  );
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  multiple: false,
  value: undefined,
};

export const SingleSelectWithValue = Template.bind({});
SingleSelectWithValue.args = {
  multiple: false,
  value: options[0],
};

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  multiple: true,
  value: [],
};

export const MultipleSelectWithValues = Template.bind({});
MultipleSelectWithValues.args = {
  multiple: true,
  value: [options[0], options[1]],
};
