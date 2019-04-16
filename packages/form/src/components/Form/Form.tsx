import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import Input from 'src/components/Input/Input';
import Button from 'src/components/Button/Button';
import { withApollo } from 'react-apollo';
import { validationSchema } from 'src/components/Validation/validationSchema';
import {
  InnerFormProps,
  FormContainerProps,
  FormProps,
  FormWrapperProps,
} from 'src/components/Form/Form.interface';
import { FieldLayout, initialValues } from 'src/components/Form/Form--layout';
import {
  mergeOrderedFields,
  createHandleSubmitFromMutation,
} from 'src/components/Form/Form--actions';
import './Form.scss';
import {
  FormWrapper,
  FormFields,
  FormButton,
} from 'src/components/Form/Form-components';

export const InnerForm = (props: InnerFormProps & FormikProps<any>) => {
  const {
    fields,
    handleChange,
    handleBlur,
    isSubmitting,
    submitButton,
    className,
    children,
    mode,
    values,
    handleSubmit,
    setFieldTouched,
    resetForm,
    setValues,
    // Submit programmatically
    submitOnChange,
    submitForm,
    layout,
  } = props;

  const Fields = fields.map(
    ({
      inputType,
      id,
      name,
      placeholder,
      attributes,
      label,
      options,
      optionGutter,
      defaultChecked,
      defaultValue,
      disabled,
      min,
      max,
      layout,
      step,
      style,
      validation,
    }) => {
      const fieldLayoutProps = {
        layout,
        name,
        id,
        label,
        validation,
      };

      return (
        <FieldLayout
          key={name}
          {...fieldLayoutProps}
          className="Form-field ant-form-item"
        >
          <Field
            inputType={inputType}
            id={id || name}
            name={name}
            attributes={attributes}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            component={Input}
            label={label}
            options={options}
            optionGutter={optionGutter}
            defaultChecked={defaultChecked}
            defaultValue={defaultValue}
            values={values}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            submitOnChange={submitOnChange}
            submitForm={submitForm}
            style={style}
          />
        </FieldLayout>
      );
    },
  );

  const DefaultForm = (
    <FormWrapper onSubmit={handleSubmit} className={className} layout={layout}>
      {Fields}
      <Button
        type="primary"
        htmlType="submit"
        disabled={isSubmitting}
        style={{ display: submitButton && submitButton.hide ? 'none' : '' }}
      >
        {submitButton && submitButton.text ? submitButton.text : 'Submit'}
      </Button>
    </FormWrapper>
  );

  return mode === 'renderProps'
    ? children!({
        FormWrapper,
        FormFields,
        Fields,
        FormButton,
        formController: {
          className,
          values,
          isSubmitting,
          handleSubmit,
          setFieldTouched,
          handleChange,
          handleBlur,
          resetForm,
          setValues,
        },
      })
    : DefaultForm;
};

const FormContainer = (props: FormContainerProps) => {
  /**
   * fields
   */
  const fieldsProps: {
    fields;
    customFields;
  } = props;

  const fields = mergeOrderedFields(fieldsProps);

  /**
   *  handleSubmit()
   */
  const actionProps: {
    client;
    mutation;
    onSubmit;
    onComplete;
  } = props;

  const handleSubmit = createHandleSubmitFromMutation(actionProps);
  /**
   *  form layout
   */
  const { layout } = props;

  const innerFormProps = {
    layout,
    fields,
    className: props.className,
    mode: props.mode,
    children: props.children,
    submitButton: props.submitButton,
    submitOnChange: props.submitOnChange,
  };

  return (
    <Formik
      initialValues={initialValues(fields)}
      validationSchema={validationSchema(fields)}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      render={(props: FormikProps<any>) => {
        const mergedProps = { ...props, ...innerFormProps };
        return <InnerForm {...mergedProps} />;
      }}
    />
  );
};

const Form = withApollo<FormProps, FormContainerProps>(FormContainer);

export default Form;
