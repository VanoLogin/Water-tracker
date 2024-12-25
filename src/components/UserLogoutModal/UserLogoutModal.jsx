import { useState } from 'react';
import css from './UserLogoutModal.module.css';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';

export default function UserLogoutModal({ onClose, isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    console.log('logout');
  };

  return (
    <Modal
      modalTitle="Log out"
      onClose={onClose}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div>
        <p className={css.text}>Do you really want to leave?</p>
        <div className={css.div}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </Modal>
  );
}