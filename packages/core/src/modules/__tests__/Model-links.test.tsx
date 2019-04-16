import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from 'antd';
import { ModelCreateButton } from '../Model/components/Model-list--layout';
import RouterMock from 'tests/mocks/RouterMock';
import { ModelPageCreate } from '../../../pages/model/create';
import { QueryParams, RouteAction } from '../../route/actions';
import Model from '../Model/data/Model';
import ApolloMockingProvider from 'tests/mocks/ApolloMockingProvider';
import mocks from 'tests/mocks/mocks';
import ModelCreateModal from '../Model/components/Model-create--modal';

describe('A create button for Model', () => {
  it('contains the correct route', () => {
    const CreateButton = shallow(<ModelCreateButton />);

    expect(CreateButton.prop('route')).toEqual(Model.CREATE);
  });

  it('displays the correct button text', () => {
    const CreateButton = mount(
      <RouterMock>
        <ModelCreateButton />
      </RouterMock>,
    );
    // console.log(CreateButton.find(Button).debug());

    expect(CreateButton.find(Button).text()).toEqual('Create');
  });

  it('displays the create modal with query params "?action=create"', () => {
    // const wrapper = shallow(<ModelCreateModal />);
    // // console.log(wrapper.debug());
    // console.log(
    //   wrapper
    //     .find(ModelPageCreate)
    //     .dive()
    //     .debug(),
    // );
  });

  // it('displays loading state for delete button on click', () => {

  // })
});
