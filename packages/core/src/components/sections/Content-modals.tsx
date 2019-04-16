import React from 'react';
import Query from 'src/utils/Query';
import { GET_MODALS } from 'src/state/apollo-link-state/modal/modalState';
import ModalAuthLogin from 'src/modules/Auth/Modal-auth--login';
import ModalAuthRegister from 'src/modules/Auth/Modal-auth--loginRegister';
import ModalAccountVerification from 'src/modules/Auth/Modal-auth--verifyAccount';
import ModalConfirmForgotPassword from 'src/modules/Auth/Modal-auth--confirmForgotPassword';
import ModalForgotPassword from 'src/modules/Auth/Modal-auth--forgotPassword';

const ContentModals = () => (
  <>
    <ModalAuthRegister />
    <ModalAccountVerification />
    <ModalConfirmForgotPassword />
    <ModalForgotPassword />
  </>
);

export default ContentModals;
