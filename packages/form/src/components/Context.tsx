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

const Context = React.createContext<ThemeContextInterface | null>(null);

const { Provider, Consumer } = Context;

export { Provider, Consumer };

export default Context;
