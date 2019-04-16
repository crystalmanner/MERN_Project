import React from 'react';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';
import ModalContainer from 'src/utils/ModalContainer';
import { Form } from '@codelab/form';

const field = {
  inputType: 'checkbox',
  name: 'gender',
  label: 'Is Male?',
  defaultChecked: true,
  placeholder: '',
};

const ModalAuthLogin = () => (
  <ModalContainer id={ModalIDs.Login} title="Login">
    <section>
      <p> Login Here!</p>
      <Form
        fields={[field]}
        onSubmit={() => Promise.resolve(console.log('resolve'))}
        onComplete={() => Promise.resolve(console.log('onComplete'))}
      />
    </section>
  </ModalContainer>
);

export default ModalAuthLogin;
