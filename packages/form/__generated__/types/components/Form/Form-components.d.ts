/// <reference types="react" />
import { FormWrapperProps } from 'src/components/Form/Form.interface';
declare const FormWrapper: ({ onSubmit, ...props }: FormWrapperProps) => JSX.Element;
declare const FormFields: ({ Fields, children, gutter }: {
    Fields: any;
    children: any;
    gutter: any;
}) => JSX.Element;
declare const FormButton: ({ isSubmitting, handleSubmit, tailFormItemLayout, layout, ...props }: any) => JSX.Element;
export { FormWrapper, FormFields, FormButton };
//# sourceMappingURL=Form-components.d.ts.map