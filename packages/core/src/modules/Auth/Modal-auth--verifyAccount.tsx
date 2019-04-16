import React from 'react';
import ModalContainer from 'src/utils/ModalContainer';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';
import { Form } from '@codelab/form';
import { adopt } from 'react-adopt';
import { get } from 'lodash';
import { Button, Row, Col } from 'antd';
import ModalSubscriber, { IModalContainer } from 'src/state/ModalSubscriber';
import { UserServiceConsumer } from '../../context/consumer';
import openNotification from '../../utils/notification-helper';

const verifyFields = [
  {
    inputType: 'text',
    name: 'code',
    placeholder: 'code:',
    validation: [{ required: true, msg: 'Required!!' }],
  },
];

const Composed = adopt<any, {}>({
  userService: ({ render }) => (
    <UserServiceConsumer>{render}</UserServiceConsumer>
  ),
  modalSub: ({ render }) => <ModalSubscriber>{render}</ModalSubscriber>,
  VerifyForm: ({ render, modalSub, userService }) => {
    const { state } = modalSub;
    const username = get(state, 'data.username');
    return (
      <Form
        mode="renderProps"
        fields={verifyFields}
        onComplete={() => Promise.resolve(console.log('onComplete'))}
        onSubmit={values =>
          new Promise((resolve, reject) => {
            userService.authService
              .confirmSignUp(username, values.code)
              .then(data => {
                resolve();
                openNotification('success', 'User is confirmed');
                modalSub.toggleModal();
              })
              .catch(err => {
                resolve();
                openNotification('error', err.message);
              });
          })
        }
      >
        {render}
      </Form>
    );
  },
});

const ModalAccountVerification = () => {
  return (
    <ModalContainer
      id={ModalIDs.VerifyAccount}
      visibleIds={[ModalIDs.VerifyAccount]}
      title="Register"
      className="Modal-auth--register"
      footer={[]}
    >
      <Composed>
        {({ VerifyForm, userService, modalSub }) => {
          const { state } = modalSub;
          const username = get(state, 'data.username');
          const { formController } = VerifyForm;
          return (
            <VerifyForm.FormFields
              Fields={VerifyForm.Fields}
              className={formController.className}
            >
              {}
              <Row type="flex" justify="space-between">
                <Col span={11}>
                  <VerifyForm.FormButton
                    isSubmitting={formController.isSubmitting}
                    handleSubmit={formController.handleSubmit}
                    block
                  >
                    Confirm
                  </VerifyForm.FormButton>
                </Col>
                <Col span={11}>
                  <Button
                    block
                    onClick={e => {
                      if (username) {
                        userService.authService.resendSignUp(username);
                        return;
                      }
                      e.preventDefault();
                    }}
                  >
                    Re-send
                  </Button>
                </Col>
              </Row>
            </VerifyForm.FormFields>
          );
        }}
      </Composed>
    </ModalContainer>
  );
};
export default ModalAccountVerification;
