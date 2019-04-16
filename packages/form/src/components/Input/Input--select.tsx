import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
interface SelectOption {
  label: string;
  value: string;
}
interface SelectInput {
  options: [SelectOption];
  defaultValue: any;
  style?: React.CSSProperties;
  name: string;
  setFieldValue: any;
}
const AppSelect = ({
  options,
  defaultValue,
  style,
  name,
  setFieldValue,
}: SelectInput) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={value => {
        setFieldValue(name, value);
      }}
      style={style}
      // name={name}
    >
      {options.map(({ label, value }, index) => {
        return (
          <Option key={index} value={value}>
            {label}
          </Option>
        );
      })}
    </Select>
  );
};
export default AppSelect;
