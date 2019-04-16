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

const Composed = adopt<any, {}>({
  userService: ({ render }) => (
    <UserServiceConsumer>{render}</UserServiceConsumer>
  ),
  modalSub: ({ render }) => <ModalSubscriber>{render}</ModalSubscriber>,
  ForgotPasswordForm: ({ render, modalSub, userService }) => {
    const { state } = modalSub;
    const username = get(state, 'data.username', '');
    const forgotPasswordFields = [
      {
        inputType: 'text',
        name: 'username',
        placeholder: 'username:',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
    return (
      <Form
        mode="renderProps"
        fields={forgotPasswordFields}
        onComplete={() => Promise.resolve(console.log('onComplete'))}
        onSubmit={values =>
          new Promise((resolve, reject) => {
            userService.authService
              .forgotPassword(values)
              .then(data => {
                resolve();
                openNotification(
                  'success',
                  'We have send a confirmation code to your email',
                );
                modalSub.toggleModal(ModalIDs.ConfirmForgotPassword, values);
              })
              .catch(err => {
                resolve();
                openNotification('success', err.message);
              });
          })
        }
      >
        {render}
      </Form>
    );
  },
});

const ModalForgotPassword = () => {
  return (
    <ModalContainer
      id={ModalIDs.ForgotPassword}
      visibleIds={[ModalIDs.ForgotPassword]}
      title="Register"
      className="Modal-auth--register"
      footer={[]}
    >
      <Composed>
        {({ ForgotPasswordForm, userService, modalSub }) => {
          const { state } = modalSub;
          const { formController } = ForgotPasswordForm;
          return (
            <ForgotPasswordForm.FormWrapper>
              <h2> Forgot Password </h2>
              <ForgotPasswordForm.FormFields
                Fields={ForgotPasswordForm.Fields}
                className={formController.className}
              />
              <ForgotPasswordForm.FormButton
                block
                isSubmitting={formController.isSubmitting}
                handleSubmit={formController.handleSubmit}
              >
                Send Code
              </ForgotPasswordForm.FormButton>
            </ForgotPasswordForm.FormWrapper>
          );
        }}
      </Composed>
    </ModalContainer>
  );
};
export default ModalForgotPassword;
