import { Tabs as AntdTabs } from 'antd';
import styled from 'styled-components';

const TabPane = AntdTabs.TabPane;

const Tabs = styled(AntdTabs)`
  .ant-tabs-nav {
    width: 100%;
    > div {
      width: 100%;
      display: flex;
      .ant-tabs-tab {
        flex-grow: 1;
        margin-right: 0px;
        width: 100%;
        text-align: center;
      }
    }
  }
`;

export default Tabs;
