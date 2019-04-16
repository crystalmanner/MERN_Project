/// <reference types="react" />
interface RadioOption {
    label: string;
    value: string;
    col: number;
}
interface RadioInput {
    name: string;
    value: boolean;
    style: string;
    label: string;
    onChange: any;
    submitOnChange: boolean;
    options: [RadioOption];
    submitForm: any;
}
declare const AppRadio: ({ onChange, options, name, value, submitOnChange, submitForm, style, }: RadioInput) => JSX.Element;
export default AppRadio;
//# sourceMappingURL=Input--radio.d.ts.map