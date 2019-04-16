import React from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import withPage from 'src/hoc/_withPage';

const withPageProps = (myPageProps = {}) => ComposedComponent => {
  const Composed = withPage(ComposedComponent);

  return class extends React.Component {
    static async getInitialProps(ctx) {
      return loadGetInitialProps(Composed, ctx);
    }

    render() {
      const props = { ...this.props, ...myPageProps };
      return <Composed {...props} />;
    }
  };
};

export default withPageProps;
