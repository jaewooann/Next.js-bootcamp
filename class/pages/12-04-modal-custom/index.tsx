import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Modal } from 'antd';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <>
      <button onClick={showModal}>모달창 열기!!</button>
      <Modal title="모달 제목" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        비밀번호 입력: <input type='password' onChange={onChangePassword} />
      </Modal>
    </>
  );
};