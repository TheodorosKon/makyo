import React, { Key } from 'react';
import Select from "react-select";

export interface SelectProps {
  id: string;
  withSeach?: boolean;
  options: any;
  multiple?: boolean;
  optionLabel: string;
  outlined: boolean;
  disabled: boolean;
  onChange?: () => void;
}

const indicatorSeparatorStyle = {
    alignSelf: 'stretch',
    marginBottom: 8,
    marginTop: 8,
    width: 1,
  };

export const SelectDropdown = ({
  id = "sdd-1",
  withSeach = false,
  options,
  multiple = false,
  optionLabel,
  ...props
}: SelectProps) => {
  return (    
    <label>
        {optionLabel}
        <Select
            closeMenuOnSelect={!multiple}
            isMulti={multiple}
            isSearchable={withSeach}
            options={options}
        />
    </label>
  );
};
