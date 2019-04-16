import React from 'react';
import './_input.scss';
export declare enum INPUT_TYPES {
    text = "text",
    textarea = "textarea",
    select = "select",
    checkbox = "checkbox",
    radio = "radio",
    datetime = "datetime",
    slider = "slider"
}
declare class Input extends React.Component {
    render(): JSX.Element;
}
export declare const InputLabel: ({ label, isRequired, id }: any) => JSX.Element;
export default Input;
//# sourceMappingURL=Input.d.ts.map