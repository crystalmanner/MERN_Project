import React from 'react';
import { Modal } from 'antd';

interface ModalProps {
  visible: boolean;
}
const ModalUserRegister = ({ visible }: ModalProps) => {
  return (
    <Modal
      className="Modal-user--register"
      title="Register User"
      visible={visible}
      onOk={() => {}}
      onCancel={() => {}}
    >
      Hello
    </Modal>
  );
};

export default ModalUserRegister;
