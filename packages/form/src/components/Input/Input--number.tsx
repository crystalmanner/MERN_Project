import React, { CSSProperties } from 'react';
import { InputNumber } from 'antd';
interface NumperInput {
  name: string;
  value: number;
  setFieldValue: any;
  min: number;
  max: number;
}
const AppNumberInput = ({
  name,
  value,
  setFieldValue,
  min,
  max,
}: NumperInput) => {
  return (
    <InputNumber
      min={min}
      max={max}
      value={value}
      onChange={value => setFieldValue(name, value)}
    />
  );
};
export default AppNumberInput;
