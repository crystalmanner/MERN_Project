import React from 'react';
import Tabs from '../Tabs/Tabs';
import { Tabs as AntdTabs } from 'antd';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faIgloo,
  faPaintBrush,
  faBars,
  faThLarge,
  faSquare,
  faSlidersH,
} from '@fortawesome/free-solid-svg-icons';

import TabBlocks from './Sidebar-tab--blocks';
import TabStyleManager from './Sidebar-tab--styleManager';
import TabLayers from './Sidebar-tab--layers';
import TabCreatePages from './Sidebar-tab--dynamicInputs';
import '../temp-style/grid.scss';
library.add(faIgloo, faPaintBrush, faBars, faThLarge, faSquare, faSlidersH);
const TabPane = AntdTabs.TabPane;

const SidebarCreateLayout = props => {
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={key => {
        console.log(key);
      }}
    >
      <TabPane tab={<FontAwesomeIcon icon="sliders-h" />} key="1">
        <TabCreatePages />
      </TabPane>
      <TabPane tab={<FontAwesomeIcon icon="paint-brush" />} key="2">
        <TabStyleManager />
      </TabPane>
      <TabPane tab={<FontAwesomeIcon icon="bars" />} key="3">
        <TabLayers />
      </TabPane>
      <TabPane tab={<FontAwesomeIcon icon="th-large" />} key="4">
        <TabBlocks />
      </TabPane>
    </Tabs>
  );
};

export default SidebarCreateLayout;
