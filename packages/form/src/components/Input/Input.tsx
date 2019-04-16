import React from 'react';
import styled from 'styled-components';
import AppNumberInput from './Input--number';
import AppColorPicker from './Input--colorPicker';
import AppCheckbox from './Input--checkbox';
import AppRadio from './Input--radio';
import AppSlider from './Input--slider';
import AppSelect from './Input--select';
import AppDatetimePicker from './Input--datePicker';
import { Input as AntdInput } from 'antd';
import ThemeProvider from 'src/components/ThemeProvider';
import './_input.scss';

const { TextArea } = AntdInput;

const ValidationErrors = styled.div.attrs({
  className: 'ValidationErrors',
})`
  min-height: 1.5rem;
  color: ${props => props.theme.color.danger};
`;

export enum INPUT_TYPES {
  text = 'text',
  textarea = 'textarea',
  select = 'select',
  checkbox = 'checkbox',
  radio = 'radio',
  datetime = 'datetime',
  slider = 'slider',
}

const inputComponents = {
  text: AntdInput,
  password: AntdInput.Password,
  textarea: TextArea,
  checkbox: AppCheckbox,
  radio: AppRadio,
  slider: AppSlider,
  select: AppSelect,
  datetime: AppDatetimePicker,
  color: AppColorPicker,
  number: AppNumberInput,
};

const DynamicInput = ({
  inputType,
  placeholder,
  field,
  values,
  value,
  setFieldValue,
  attributes, // HTML attributes
  submitOnChange,
  submitForm,
  ...props
}) => {
  const SpecificInput = inputComponents[inputType];
  if (['text', 'password', 'textarea'].includes(inputType)) {
    return (
      <SpecificInput
        placeholder={placeholder}
        {...attributes}
        {...props}
        autoComplete="off"
        value={attributes && attributes.sync ? values[attributes.sync] : value}
      />
    );
  }

  return (
    <SpecificInput
      setFieldValue={setFieldValue}
      placeholder={placeholder}
      submitOnChange={submitOnChange}
      submitForm={submitForm}
      {...attributes}
      {...props}
      autoComplete="off"
      value={value}
    />
  );
};

class Input extends React.Component {
  render() {
    const {
      placeholder,
      inputType,
      field,
      form: { touched, errors, setFieldValue },
      options,
      label,
      defaultChecked,
      defaultValue,
      attributes,
      disabled,
      min,
      max,
      step,
      values,
      // Submit
      submitOnChange,
      submitForm,
      style,
    }: any = this.props;
    const { name, id } = field;
    return (
      <ThemeProvider>
        <React.Fragment>
          {/* {label && inputType !== "checkbox" && <div>{label}</div>} */}
          {/* <AntdForm.Item label={label && lbElement}> */}
          <DynamicInput
            inputType={inputType}
            values={values}
            placeholder={placeholder}
            setFieldValue={setFieldValue}
            attributes={attributes}
            {...field}
            label={label}
            options={options}
            defaultChecked={defaultChecked}
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            // Form submission
            submitOnChange={submitOnChange}
            submitForm={submitForm}
            style={style}
            id={id || name}
          />
          <ValidationErrors>
            {touched[name] && errors[name] ? errors[name] : null}
          </ValidationErrors>
          {/* </AntdForm.Item> */}
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export const InputLabel = ({ label, isRequired, id }: any) => (
  <div className="form-label-wrapper ant-form-item-label">
    <label htmlFor={id} className={isRequired ? 'ant-form-item-required' : ''}>
      {label}
    </label>
  </div>
);
export default Input;
