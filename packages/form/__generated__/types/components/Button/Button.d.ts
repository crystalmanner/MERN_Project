import React from 'react';
declare type Dimension = {
    height?: string;
    width?: string;
};
declare type Spacing = {
    margin?: string;
    marginbottom?: string;
    padding?: string;
};
declare const Button: import("styled-components").StyledComponent<(props: {
    htmlType?: "button" | "reset" | "submit" | undefined;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
} & import("antd/lib/button/button").BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & Dimension & Spacing) => JSX.Element, any, {}, never>;
export default Button;
//# sourceMappingURL=Button.d.ts.map