import React from 'react';
import { mount } from 'enzyme';
import Form from 'src/components/Form/Form';
import Context from 'src/components/Context';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, ApolloLink, HttpLink } from 'apollo-boost';
import stateLink from 'src/state';
import { ApolloClient } from 'apollo-client';
import { action } from '@storybook/addon-actions';

const theme = {
  color: {
    primary: '#2b4ed3',
    danger: '#d32b2b',
    success: 'green',
  },
  padding: {
    md: '1.5rem',
  },
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([stateLink]),
});

export const FormProvider = ({ children }) => (
  <ApolloProvider client={client}>
    <Context.Provider value={theme}>
      <div className="container">{children}</div>
    </Context.Provider>
  </ApolloProvider>
);

export const FormDecorator = children => (
  <ApolloProvider client={client}>
    <Context.Provider value={theme}>
      <div className="container">{children()}</div>
    </Context.Provider>
  </ApolloProvider>
);

export const ON_SUBMIT = input => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(action('createModel'));
    }, 1200);
  });
};

export const ON_COMPLETE = action('onComplete');

export const mountForm = ({ fields, ...props }) =>
  mount(
    <FormProvider>
      <Form
        {...props}
        fields={fields}
        onSubmit={ON_SUBMIT}
        onComplete={ON_COMPLETE}
      />
    </FormProvider>,
  );
