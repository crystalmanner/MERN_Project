import { InputLayout } from 'src/components/Form/Form--layout';
import { WithApolloClient } from 'react-apollo';

export type FormContainerProps = FormProps & WithApolloClient<any>;

/**
 * The Form API
 */
export enum FormLayout {
  INLINE = 'inline',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}
export type FormProps = InnerFormProps & {
  customFields?: InputSetting[];
  layout?: FormLayout;
  onSubmit: (any) => Promise<any>;
  onComplete?: (any) => void;
};

export type InnerFormProps = {
  fields: InputSetting[];
  className?: string;
  mode?: string;
  layout?: FormLayout;
  submitOnChange?: boolean;
  submitButton?: any;
  children?: (any) => JSX.Element; // Insert extra content inside form
};

export interface InputSetting {
  name: string;
  value?: string | number;
  inputType: string;
  placeholder?: string;
  label?: string;
  optionGutter?: number;

  // attr
  index?: number;
  id?: string;
  attributes?: any;
  defaultChecked?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  style?: string;

  // checkbox
  max?: number;
  min?: number;
  step?: number;
  options?: any[];
  // [propName: string]: any;
  layout?: InputLayout;
  validation?: any[];
}

export interface FormWrapperProps {
  onSubmit: () => void;
  className?: string;
  children?: React.ReactNode;
  layout?: FormLayout;
}
