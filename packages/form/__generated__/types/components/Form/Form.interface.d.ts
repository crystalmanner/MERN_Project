/// <reference types="react" />
import { InputLayout } from 'src/components/Form/Form--layout';
import { WithApolloClient } from 'react-apollo';
export declare type FormContainerProps = FormProps & WithApolloClient<any>;
/**
 * The Form API
 */
export declare enum FormLayout {
    INLINE = "inline",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}
export declare type FormProps = InnerFormProps & {
    customFields?: InputSetting[];
    layout?: FormLayout;
    onSubmit: (any: any) => Promise<any>;
    onComplete?: (any: any) => void;
};
export declare type InnerFormProps = {
    fields: InputSetting[];
    className?: string;
    mode?: string;
    layout?: FormLayout;
    submitOnChange?: boolean;
    submitButton?: any;
    children?: (any: any) => JSX.Element;
};
export interface InputSetting {
    name: string;
    value?: string | number;
    inputType: string;
    placeholder?: string;
    label?: string;
    optionGutter?: number;
    index?: number;
    id?: string;
    attributes?: any;
    defaultChecked?: boolean;
    defaultValue?: any;
    disabled?: boolean;
    style?: string;
    max?: number;
    min?: number;
    step?: number;
    options?: any[];
    layout?: InputLayout;
    validation?: any[];
}
export interface FormWrapperProps {
    onSubmit: () => void;
    className?: string;
    children?: React.ReactNode;
    layout?: FormLayout;
}
//# sourceMappingURL=Form.interface.d.ts.map