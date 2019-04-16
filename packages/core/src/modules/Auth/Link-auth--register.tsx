import React from 'react';
import { Mutation } from 'react-apollo';
import {
  TOGGLE_MODAL,
  ModalIDs,
} from 'src/state/apollo-link-state/modal/modalState';
import ModalSubscriber from 'src/state/ModalSubscriber';

// const LinkAuthRegister = () => (
//   <Mutation mutation={TOGGLE_MODAL} variables={{ id: ModalIDs.Register }}>
//     {toggleModal => (
//       <a className="Link-auth--register" onClick={() => toggleModal()}>
//         Register
//       </a>
//     )}
//   </Mutation>
// );

const LinkAuthRegister = props => (
  <ModalSubscriber>
    {subscriber => {
      return (
        <a
          className="Link-auth--register"
          onClick={() => subscriber.toggleModal(ModalIDs.Register)}
        >
          Register
        </a>
      );
    }}
  </ModalSubscriber>
);

export default LinkAuthRegister;
