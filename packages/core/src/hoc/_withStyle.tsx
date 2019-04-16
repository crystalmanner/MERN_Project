import React, { Component } from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { Context } from '@codelab/form';

import '@codelab/form/dist/main.css';
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'react-sortable-tree/style.css';

const theme = {
  color: {
    primary: '#2b4ed3',
    danger: '#d32b2b',
    success: 'green',
  },
  padding: {
    md: '1rem',
  },
};

export default ComposedComponent =>
  class WithStyle extends Component {
    static async getInitialProps(ctx) {
      return loadGetInitialProps(ComposedComponent, ctx);
    }

    render() {
      return (
        <Context.Provider value={theme}>
          <ComposedComponent {...this.props} />
          <style>
            {`
          #__next,
          .ant-layout {
            height: 100%;
          }

          .container {
            width: 100%;
            height: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }

          @media (min-width: 576px) {
            .container {
              max-width: 540px;
            }
          }

          @media (min-width: 768px) {
            .container {
              max-width: 720px;
            }
          }

          @media (min-width: 992px) {
            .container {
              max-width: 960px;
            }
          }

          @media (min-width: 1200px) {
            .container {
              max-width: 1140px;
            }
          }
        `}
          </style>
        </Context.Provider>
      );
    }
  };
