import type { Meta, StoryObj } from '@storybook/react';

import SelectDropdown from './SelectDropdown.tsx';

const meta: Meta<typeof SelectDropdown> = {
    component: SelectDropdown,
    title: 'Select Dropdown'
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        
    }
}