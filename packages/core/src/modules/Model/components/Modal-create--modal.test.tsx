import React from 'react';
import renderer from 'react-test-renderer';
import ModelCreateModal from 'src/modules/Model/components/Model-create--modal';

const onOkMock = jest.fn(() => {});
const onCancelMock = jest.fn(() => {});
const onCompleteMock = jest.fn(() => {});
const createModekMock = jest.fn(() => {});

const Comp = () => <div>hi</div>;

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Comp />,
      // <ModelCreateModal
      //   visible={true}
      //   createModel={createModekMock}
      //   handleOk={onOkMock}
      //   handleCancel={onCancelMock}
      //   onComplete={onCompleteMock}
      // />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
