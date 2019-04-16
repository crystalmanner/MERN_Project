import React, { Component } from 'react';
import { Col, Layout, Menu, Row, Table } from 'antd';
import { loadGetInitialProps } from 'next/dist/lib/utils';

import Header from 'src/components/sections/Header';
import Footer from 'src/components/sections/Footer';
import Breadcrumb from 'src/components/snippets/Breadcrumb';
import modelLinks from 'src/modules/Model/data/Model-links';
import ContentModals from 'src/components/sections/Content-modals';

import { Screen } from '@codelab/layout';
import Query from 'src/utils/Query';
import { GET_CONFIG } from 'src/state/apollo-link-state/config/configState';
import styled from 'styled-components';
import SidebarUIBuilder from 'src/components/sections/Sidebar--uiBuilder';

const { Content } = Layout;
const LayoutHeader = Layout.Header;
const LayoutFooter = Layout.Footer;
const Sider = Layout.Sider;

const Sidebar = styled(Sider)`
  &.ant-layout-sider-dark {
    .ant-radio-wrapper span {
      color: white;
    }
  }
  .ant-tabs {
    color: white;
  }
`;

export default ComposedComponent =>
  class WithLayout extends Component<{
    url: any;
    hasSidebar?: boolean;
    screenSize?: Screen.Size;
  }> {
    static async getInitialProps(ctx) {
      return loadGetInitialProps(ComposedComponent, ctx);
    }

    private getContentStyle(config) {
      const width = `${Screen.Width.Base[config.screenSize]}px`;

      return {
        maxWidth: width,
      };
    }

    render() {
      const route = this.props.url.route;

      let contentClassName = 'container';
      if (this.props.screenSize) {
        contentClassName += ` Container--${this.props.screenSize}`;
      }

      return (
        <Layout>
          <LayoutHeader>
            <Header {...this.props} />
          </LayoutHeader>
          <Layout>
            {this.props.hasSidebar ? (
              <Sidebar theme="dark" width={400}>
                <style>
                  {`
                  .antd-layout-sider.ant-layout-sider-dark .ant-radio-wrapper span {
                    color: white;
                  }
                .ant-layout.ant-layout-has-sider {
                  flex-direction: row-reverse;
                }
                `}
                </style>
                <SidebarUIBuilder />
              </Sidebar>
            ) : null}
            <Layout>
              <Query query={GET_CONFIG}>
                {({ config }) => {
                  return (
                    <Content
                      className={contentClassName}
                      style={this.getContentStyle(config)}
                    >
                      {/* <Breadcrumb links={modelLinks} route={route} /> */}
                      <ComposedComponent {...this.props} />
                      <ContentModals />
                    </Content>
                  );
                }}
              </Query>
              <LayoutFooter>
                <Footer />
              </LayoutFooter>
            </Layout>
          </Layout>
        </Layout>
      );
    }
  };
