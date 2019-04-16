import React from 'react';
import { Collapse, Icon, Row, Col } from 'antd';
import { Form } from '@codelab/form';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Panel = Collapse.Panel;

const PanelHeader = styled.h5`
  color: white;
`;

const customPanelStyle = {
  // background: 'rgba(19,3,51,0.9)',
  border: 0,
  overflow: 'hidden',
};

const TabLayers = () => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <Icon type="caret-right" />}
    >
      <Panel header={'Body'} key={''} style={customPanelStyle}>
        <div>sub layers</div>
      </Panel>
    </Collapse>
  );
};

export default TabLayers;
