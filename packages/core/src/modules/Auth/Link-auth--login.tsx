import React from 'react';
import { Mutation } from 'react-apollo';
import {
  TOGGLE_MODAL,
  ModalIDs,
} from 'src/state/apollo-link-state/modal/modalState';
import ModalSubscriber from 'src/state/ModalSubscriber';

// const LinkAuthLogin = props => (
//   <Mutation mutation={TOGGLE_MODAL} variables={{ id: ModalIDs.Login }}>
//     {toggleModal => (
//       <a className="Link-auth--login" onClick={() => toggleModal()}>
//         Login
//       </a>
//     )}
//   </Mutation>
// );

const LinkAuthLogin = props => (
  <ModalSubscriber>
    {subscriber => {
      return (
        <a
          className="Link-auth--login"
          onClick={() => subscriber.toggleModal(ModalIDs.Login)}
        >
          Login
        </a>
      );
    }}
  </ModalSubscriber>
);

export default LinkAuthLogin;
