import React from 'react';
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
declare const AppSelect: ({ options, defaultValue, style, name, setFieldValue, }: SelectInput) => JSX.Element;
export default AppSelect;
//# sourceMappingURL=Input--select.d.ts.map