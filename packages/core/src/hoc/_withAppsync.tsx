import React from 'react';
import { AUTH_TYPE } from 'aws-appsync';
// import { withAppSyncData } from 'next-apollo-appsync';
import { withAppSyncData } from '@codelab/appsync';
import awsConfig from 'src/aws-exports';
import { stateLink } from 'src/state/apollo-link-state';
import Amplify, { Auth } from 'aws-amplify';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { compose } from 'recompose';
import { ApolloConsumer } from 'react-apollo';

Amplify.configure(awsConfig);

const AppSyncConfig = {
  url: awsConfig.aws_appsync_graphqlEndpoint,
  region: awsConfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsConfig.aws_appsync_apiKey,
  },
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
            const props = { ...this.props, client };
            return <ComposedComponent {...props} />;
          }}
        </ApolloConsumer>
      );
    }
  };

export default compose(
  // Attaches Apollo to context
  withAppSyncData(AppSyncConfig, stateLink),
  // Then attach client to props
  withApollo,
);
