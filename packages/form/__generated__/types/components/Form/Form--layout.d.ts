/// <reference types="react" />
interface Layout {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
}
export interface InputLayout {
    wrapperLayout: Layout;
    labelLayout?: Layout;
}
declare const getFormLayout: (layout: any) => {
    wrapperLayout: any;
    labelLayout: any;
    inputLayout: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
};
declare const isRequired: (validation: any) => boolean;
declare const initialValues: (fields: any) => any;
declare const FieldLayout: ({ layout, name, id, label, validation, children, className, }: {
    layout: any;
    name: any;
    id: any;
    label: any;
    validation: any;
    children: any;
    className: any;
}) => JSX.Element;
export { getFormLayout, isRequired, FieldLayout, initialValues };
//# sourceMappingURL=Form--layout.d.ts.map