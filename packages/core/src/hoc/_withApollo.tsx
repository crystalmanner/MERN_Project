import React from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { compose } from 'recompose';
import { withNextApollo, ApolloConfig } from '@codelab/next-apollo';
import { ApolloConsumer } from 'react-apollo';
import { stateLink, newStateLink } from 'src/state/apollo-link-state';

const withDefaultState = ({ cache }) => {
  cache.writeData({
    data: {
      ...newStateLink.defaults,
    },
  });
};

const withApollo = ComposedComponent =>
  class extends React.Component {
    static async getInitialProps(ctx) {
      return loadGetInitialProps(ComposedComponent, ctx);
    }

    render() {
      return (
        <ApolloConsumer>
          {client => {
            withDefaultState(client);
            const props = { ...this.props, client };
            return <ComposedComponent {...props} />;
          }}
        </ApolloConsumer>
      );
    }
  };

const config: ApolloConfig = {
  uri: 'https://api-uswest.graphcms.com/v1/cjj7mi1rj05uo01cm6q486ov1/master',
  resolvers: newStateLink.resolvers,
};

export default compose(
  // Attaches Apollo to context
  withNextApollo(config),
  // Then attach client to props
  withApollo,
);
