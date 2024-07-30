import Select from "react-select";
import '../index.css';

export interface SelectProps {
  id: string;
  withSeach: boolean;
  options?: any;
  multiple: boolean;
  optionLabel: string;
  outlined: boolean;
  disabled: boolean;
  onChange?: () => void;
}

export const SelectDropdown = ({
  //Args can be passed down through ...props and then be called using pros.value. 
  //Each approach has pros and cons. 
  //I chose to have them individualy in this case so the component can be understood easier
  id = "ID",
  withSeach = false,
  multiple = false,
  optionLabel,
  options,
  disabled = false,
  ...props
}: SelectProps) => {
  return (   
    <div className={"absolute flex px-5 justify-between inset-x-0 top-8 w-full"}>
      <label className={"content-center"}>
      {optionLabel}
      </label>
      <Select
          className={"w-5/6 focus:outline-0"}
          menuPortalTarget={document.body} //This will Ensure the floating options will always render over everything
          menuPosition={'absolute'}
          closeMenuOnSelect={!multiple}
          isMulti={multiple}
          isSearchable={withSeach}
          options={options}
          isDisabled={disabled}
          {...props}
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={{ control: (baseStyles) => ({
            ...baseStyles,
            borderColor: 'grey',
            boxShadow: "none",
            border: '1px solid grey'
          }), }}
      />
    </div> 
  );
};