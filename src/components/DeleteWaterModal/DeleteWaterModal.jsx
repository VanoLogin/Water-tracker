import React from 'react';
import styles from './DeleteWaterModal.module.css';
import Modal from '../Modal/Modal';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { deleteWater } from '../../redux/water/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodayWaterAmount } from '../../redux/water/selectors';

const DeleteWaterModal = ({ isOpen, onClose, entryId, setIsOpen }) => {
  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch(deleteWater(entryId));
  };
  console.log(entryId);
  return (
    <Modal
      modalTitle="Delete entry"
      onClose={onClose}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      style={{ color: 'red' }}
    >
      <div className={styles.container}>
        <p className={styles.text}>
          Are you sure you want to delete this entry?
        </p>
        <div className={styles.buttonContainer}>
          <ButtonComponent
            text="Delete"
            color="rgba(255, 255, 255, 1)"
            backgroundColor="rgba(239, 80, 80, 1)"
            onClick={handleModal}
          />
          <ButtonComponent
            text="Cancel"
            color="rgba(64, 123, 255, 1)"
            backgroundColor="rgba(215, 227, 255, 1)"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
