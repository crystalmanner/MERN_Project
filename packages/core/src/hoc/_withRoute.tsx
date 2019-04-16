import React, { Component } from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import routes from 'src/route/routes';

const withRouterProps = ComposedComponent =>
  class WithRoute extends Component {
    static async getInitialProps(ctx) {
      let pageProps: any = {};
      pageProps = await loadGetInitialProps(ComposedComponent, ctx);
      pageProps.url = routes.match(ctx.asPath);
      return { pageProps };
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };

export default compose(
  withRouter,
  withRouterProps,
);
