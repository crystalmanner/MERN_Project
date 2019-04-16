import React, { Component, ReactNode } from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { compose } from 'recompose';
import Loader from 'src/components/snippets/Loader';
import UserService from 'src/modules/User/User--service';
import { ServiceContext } from 'src/context/context';
import { GET_CONFIG } from 'src/state/apollo-link-state/config/configState';

/**
 * This file loads data
 */

interface P {
  client: any;
  children: (any?) => ReactNode;
}

class DataMiddleware extends React.Component<P, any> {
  userService;

  config; // Fetched from local state, used for configuring screen

  constructor(props) {
    super(props);

    this.userService = new UserService(props.client);

    this.state = {
      user: null,
      loading: true,
      delay: 0,
    };

    this.config = null;
  }

  componentDidMount() {
    setTimeout(async () => {
      // await this.userService.refetchUser();

      /**
       * Add Config
       */
      this.config = (await this.props.client.query({
        query: GET_CONFIG,
      })).data.config;

      await this.setState({ loading: false });
    }, this.state.delay);
  }

  render() {
    return !this.state.loading ? (
      <>
        {/* <ServiceContext.Provider value={{ userService: this.userService }}> */}
        {this.props.children({ config: this.config })}
        {/* </ServiceContext.Provider> */}
      </>
    ) : (
      <Loader />
    );
  }
}

const withLoader = ComposedComponent =>
  class extends Component<any, {}> {
    static async getInitialProps(ctx) {
      const pageProps = loadGetInitialProps(ComposedComponent, ctx);
      return { pageProps };
    }

    render() {
      return (
        <DataMiddleware client={this.props.client}>
          {fetchedProps => {
            const props = { ...this.props, ...fetchedProps };
            return <ComposedComponent {...props} />;
          }}
        </DataMiddleware>
      );
    }
  };

export default compose(withLoader);
