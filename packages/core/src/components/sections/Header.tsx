import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import LinkAuthLogin from 'src/modules/Auth/Link-auth--login';
import LinkAuthRegister from 'src/modules/Auth/Link-auth--register';
import { GET_USER } from 'src/state/apollo-link-state/user/userState';
import { Query } from 'react-apollo';
import User from 'src/modules/User/User';
import RadioScreenSizes from 'src/modules/Builder/Radio--screenSizes';
import styled from 'styled-components';

const menu = (
  <Menu>
    <Menu.Item>
      <User>{userService => <a onClick={userService.logout}>Log Out</a>}</User>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const Profile = ({ user }) => (
  <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" href="#">
      {user.username} <Icon type="down" />
    </a>
  </Dropdown>
);

const CustomDisabledMenuItem = styled.div`
  .ant-menu-item-disabled,
  .ant-menu-submenu-disabled {
    cursor: default;
  }
`;

const Header = props => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['2']}
    style={{ lineHeight: '64px' }}
  >
    <Menu.Item key="1">nav 1</Menu.Item>
    <Menu.Item key="2">nav 2</Menu.Item>
    <Menu.Item key="3">nav 3</Menu.Item>
    <Menu.Item key="profile" style={{ float: 'right' }}>
      {/* <Query query={GET_USER}>
        {({ data: { user } }) => {
          const { authenticated } = user;
          return authenticated ? <Profile user={user} /> : null;
        }}
      </Query> */}
    </Menu.Item>
    {/* {props.user.authenticated ? <Profile user={props.user} /> : null}  */}
    <Menu.Item key="login" style={{ float: 'right' }}>
      {/* <Query query={GET_USER}>
        {({
          data: {
            user: { authenticated },
          },
        }) => (!authenticated ? <LinkAuthLogin /> : null)}
      </Query> */}
      <a href="/authentication">Log in</a>
    </Menu.Item>
    <Menu.Item key="register" style={{ float: 'right' }}>
      {/* <Query query={GET_USER}>
        {({
          data: {
            user: { authenticated },
          },
        }) => (!authenticated ? <LinkAuthRegister /> : null)}
      </Query> */}
    </Menu.Item>
    <Menu.Item key="screenSize" style={{ float: 'right' }} disabled={true}>
      <style>
        {`
          .ant-menu-item-disabled,
          .ant-menu-submenu-disabled {
            cursor: default
          }
        `}
      </style>
      <RadioScreenSizes />
    </Menu.Item>
  </Menu>
);

export default Header;
