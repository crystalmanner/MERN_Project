import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal, Button } from 'antd';
import modalState, {
  GET_MODALS,
  GET_MODAL,
  TOGGLE_MODAL,
  ModalIDs,
} from './modalState';
import { Mutation } from 'react-apollo';
import Query from 'src/utils/Query';
import wait from 'waait';
import { find } from 'lodash';
import ApolloMockingProvider from 'tests/mocks/ApolloMockingProvider';

const MockedModal = props => {
  return <div {...props} />;
};

describe('modals testing', () => {
  it('renders all modals', () => {
    const wrapper = mount(
      <ApolloMockingProvider customResolvers={{}} cacheResolvers={modalState}>
        <Query query={GET_MODALS}>
          {data => {
            const { modals } = data;
            return <MockedModal modals={modals} />;
          }}
        </Query>
      </ApolloMockingProvider>,
    );

    expect(wrapper.find(MockedModal).prop('modals')).toMatchObject(
      modalState.defaults.modals,
    );
  });

  it('read a modal', async () => {
    const id = ModalIDs.Register;

    const wrapper = mount(
      <ApolloMockingProvider customResolvers={{}} cacheResolvers={modalState}>
        <Query query={GET_MODAL} variables={{ id }}>
          {data => {
            const { modal } = data;
            return <MockedModal modal={modal} />;
          }}
        </Query>
      </ApolloMockingProvider>,
    );

    await wait(0);
    expect(
      wrapper
        .update()
        .find(MockedModal)
        .prop('modal'),
    ).toMatchObject(find(modalState.defaults.modals, { id })!);
  });

  it('toggle modal', async () => {
    const wrapper = mount(
      <ApolloMockingProvider customResolvers={{}} cacheResolvers={modalState}>
        <Query query={GET_MODAL} variables={{ id: ModalIDs.Register }}>
          {data => {
            const { modal } = data;

            return (
              <div>
                <Mutation mutation={TOGGLE_MODAL}>
                  {toggleModal => {
                    return (
                      <Button
                        type="primary"
                        onClick={() => {
                          toggleModal({ variables: { id: modal.id } });
                        }}
                      >
                        ToggleModal
                      </Button>
                    );
                  }}
                </Mutation>
                <MockedModal modal={modal} />
              </div>
            );
          }}
        </Query>
      </ApolloMockingProvider>,
    );

    /**
     * Get modal visibilty before calling mutation
     */
    await wait(0);
    const previousVisibilty = wrapper
      .update()
      .find(MockedModal)
      .prop('modal').visible;

    /**
     * Simulate mutation by button click
     */
    const toggleModalBtnWrapper = wrapper.find(Button).first();
    toggleModalBtnWrapper.simulate('click');
    await wait(0);

    expect(
      wrapper
        .update()
        .find(MockedModal)
        .prop('modal').visible,
    ).toBe(!previousVisibilty);
  });
});
