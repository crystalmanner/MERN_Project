import React from 'react';
interface ThemeContextInterface {
    color: {
        primary: string;
        danger: string;
        success: string;
    };
    padding: {
        md: string;
    };
}
declare const Context: React.Context<ThemeContextInterface | null>;
declare const Provider: React.ProviderExoticComponent<React.ProviderProps<ThemeContextInterface | null>>, Consumer: React.ExoticComponent<React.ConsumerProps<ThemeContextInterface | null>>;
export { Provider, Consumer };
export default Context;
//# sourceMappingURL=Context.d.ts.map