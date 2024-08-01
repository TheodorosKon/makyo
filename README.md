
# SelectDropdown Component

The `SelectDropdown` component is a versatile dropdown selector for React applications. It supports both single and multiple selections, customizable search functionality, and various styling options.

## Features

-   **Single and Multiple Selection**: Choose whether the dropdown allows single or multiple selections.
-   **Searchable Options**: Include a search input to filter options.
-   **Customizable Styling**: Apply custom styles and classes.
-   **Accessibility**: Handles keyboard navigation and focus management.

## Installation

To use the `SelectDropdown` component, ensure you have the necessary dependencies:

bash

Copy code

`npm install react react-dom` 

## Usage

### Importing the Component

First, import the `SelectDropdown` component into your React component:

tsx

Copy code

`import { SelectDropdown, SelectOption } from './SelectDropdown';` 

### Component Props

Here’s a breakdown of the props you can use with `SelectDropdown`:

-   `options` (required): Array of options to display in the dropdown. Each option should be an object with `label` and `value` properties.
-   `multiple` (optional): Set to `true` for multiple selections; defaults to `false`.
-   `value` (optional): The currently selected value(s). For single selection, this should be an object; for multiple, it should be an array of objects.
-   `onChange` (required): Callback function that receives the selected value(s) when changed.
-   `withSearch` (optional): Boolean to enable or disable the search input; defaults to `true`.
-   `outlined` (optional): Boolean to add outline styling to the dropdown; defaults to `false`.
-   `disabled` (optional): Boolean to disable the dropdown; defaults to `false`.
-   `optionLabel` (optional): Label for the dropdown; defaults to `"Label"`.
-   `id` (optional): Optional ID for the dropdown element.

### Example Usage

#### Single Select

tsx

Copy code

    `import React, { useState } from 'react';
    import { SelectDropdown, SelectOption } from './SelectDropdown';
    
    const singleSelectOptions: SelectOption[] = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 }
    ];
    
    const SingleSelectExample: React.FC = () => {
      const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(undefined);
    
      const handleChange = (value: SelectOption | undefined) => {
        setSelectedOption(value);
      };
    
      return (
        <SelectDropdown
          options={singleSelectOptions}
          value={selectedOption}
          onChange={handleChange}
        />
      );
    };
    
    export default SingleSelectExample;` 

#### Multiple Select

tsx

Copy code

    `import React, { useState } from 'react';
    import { SelectDropdown, SelectOption } from './SelectDropdown';
    
    const multipleSelectOptions: SelectOption[] = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 }
    ];
    
    const MultipleSelectExample: React.FC = () => {
      const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
    
      const handleChange = (value: SelectOption[]) => {
        setSelectedOptions(value);
      };
    
      return (
        <SelectDropdown
          multiple
          options={multipleSelectOptions}
          value={selectedOptions}
          onChange={handleChange}
        />
      );
    };
    
    export default MultipleSelectExample;` 

## Styling

The `SelectDropdown` component uses CSS modules for styling. Ensure you have the corresponding CSS file (`SelectDropdown.module.css`) included in your project to apply the default styles. You can customize these styles as needed.

### Example CSS Module

css

Copy code

    `/* SelectDropdown.module.css */
    
    .wrapper {
      /* Wrapper styles */
    }
    
    .container {
      /* Dropdown container styles */
    }
    
    .outlined {
      /* Outlined dropdown styles */
    }
    
    .disabled {
      /* Disabled dropdown styles */
    }
    
    .options {
      /* Options list styles */
    }
    
    .option {
      /* Option item styles */
    }
    
    .highlight {
      /* Highlighted text styles */
    }
    
    .searchContainer {
      /* Search input container styles */
    }
    
    .searchInput {
      /* Search input styles */
    }
    
    .clearButton {
      /* Clear button styles */
    }
    
    .arrowIcon {
      /* Arrow icon styles */
    }` 

## Accessibility

The `SelectDropdown` component is designed with basic accessibility features:

-   Supports keyboard navigation (Enter, Space, ArrowUp, ArrowDown, Escape).
-   Focus management for the search input.

## Contributing

Feel free to submit issues or pull requests to improve the component. For any questions or feature requests, please open an issue in the repository.

----------

Feel free to adjust any details or add more information based on your needs!