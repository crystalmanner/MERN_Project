import React from 'react';
import { Collapse, Icon, Row, Col } from 'antd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GridLayout from 'react-grid-layout';
const Panel = Collapse.Panel;

const PanelHeader = styled.h5`
  /* color: white; */
`;
const customPanelStyle = {
  // background: 'rgba(19,3,51,0.9)',
  border: 0,
};

const basicGrids = [
  {
    key: '1 Column',
    className: 'grid_block-1',
  },
  {
    key: '2 Columns',
    className: 'grid_block-2',
  },
  {
    key: '3 Colums',
    className: 'grid_block-3',
  },
  {
    key: '2 Colums 3/7',
    className: 'grid_block-3-of-7',
  },
  {
    key: 'Text',
    className: 'grid_block-text',
  },
  {
    key: 'Link',
    className: 'grid_block-link',
  },
];

class BasicLayout extends React.Component {
  generateLayouts() {
    const width = 6;
    const height = 3;
    return basicGrids.map((grid, index) => {
      return {
        i: `${index}`,
        x: (index % 2) * 6,
        y: height * Math.floor(index / 2),
        h: height,
        w: width,
      };
    });
  }
  render() {
    return (
      <GridLayout
        className="layout"
        layout={this.generateLayouts()}
        cols={12}
        rowHeight={30}
        width={350}
      >
        {basicGrids.map((grid, index) => (
          <div
            className={`block grid_fonts ${grid.className}`}
            key={`${index}`}
          >
            <div>{grid.key}</div>
          </div>
        ))}
      </GridLayout>
    );
  }
}

const TabBlocks = () => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      // expandIcon={({ isActive }) => (
      //   <Icon type={isActive ? 'caret-down' : 'caret-right'} />
      // )}
    >
      <Panel header="Basic" key="1" style={customPanelStyle}>
        <BasicLayout />
      </Panel>
      <Panel header="Extra" key="2" style={customPanelStyle}>
        <div
          className="gjs-fonts gjs-f-b1 gjs-block gjs-one-bg gjs-four-color-h"
          title="2 Columns"
          draggable={true}
        >
          <div className="gjs-block-label">2 Columns</div>
        </div>
      </Panel>
      <Panel header="Forms" key="3" style={customPanelStyle}>
        <Row>
          <Col span={12}>
            <div className="block" />
          </Col>
          <Col span={12}>
            <div className="block" />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default TabBlocks;
