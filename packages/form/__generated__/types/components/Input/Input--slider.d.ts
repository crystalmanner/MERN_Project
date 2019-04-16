/// <reference types="react" />
interface SliderInput {
    name: string;
    defaultValue: number;
    setFieldValue: any;
    max: number;
    min: number;
    value: number;
    step: number;
}
declare const AppSlider: ({ name, defaultValue, setFieldValue, max, min, value, step, }: SliderInput) => JSX.Element;
export default AppSlider;
//# sourceMappingURL=Input--slider.d.ts.map