import React from 'react';
import App, { Container } from 'next/app';
import routes from 'src/route/routes';
import { Auth } from 'aws-amplify';

if (process.browser) {
  // client-side-only code
  require('whatwg-fetch'); // required until cypress support fetch API
}

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      // Attach next-routes 'name' property to props.url.route.name
      pageProps.url = routes.match(ctx.asPath);
    }

    // console.log('pageProps', pageProps);
    // console.log('pageProps.url.route.name', pageProps.url.route.name);

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
