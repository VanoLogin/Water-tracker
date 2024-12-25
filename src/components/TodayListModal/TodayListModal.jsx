import css from './TodayListModal.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { postWater } from '../../redux/water/operations';
import { useDispatch } from 'react-redux';


function convertDateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

 
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function TodayListModal({ onClose, isOpen, setIsOpen }) {
  const [amount, setAmount] = useState(50);
  const [currentTime, setCurrentTime] = useState(new Date());

  const dispatch = useDispatch();

 
const handleTimeChange = event => {
    const time = event.target.value;

    if (time.length === 5) {
        const [hours, minutes] = time.split(':');
        const updatedTime = new Date(currentTime);
        updatedTime.setHours(parseInt(hours, 10));
        updatedTime.setMinutes(parseInt(minutes, 10));

        setCurrentTime(updatedTime);
    } else {
        console.log("Невалідний час або час ще не повністю введено");
    }
};


  const handleInputAmountChange = event => {
    const value = event.target.value;
    setAmount(parseInt(value, 10) || 0); 
  };

  const handleAmountAdjustment = adjustment => {
    setAmount(prevAmount => Math.max(0, prevAmount + adjustment)); 
  };

 
  const handleSave = () => {
    const isoDate = convertDateToISO(currentTime); 
    const waterData = {
      waterVolume: Number(amount),
      date: isoDate,
    };

    dispatch(postWater(waterData)); 
    onClose(); 
  };

  return (
    <Modal
      modalTitle="Add water"
      onClose={onClose}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className={css.modalContainer}>
        <p className={css.large_text}>Choose a value:</p>
        <p className={css.small_text}>Amount of water:</p>
        <div className={css.div}>
          <button
            className={css.icon}
            onClick={() => handleAmountAdjustment(-50)}
          >
            <svg width="24" height="24" fill=" #407bff">
              <use href="/src/assets/img/icons.svg#icon-minus"></use>
            </svg>
          </button>
          <span className={css.amount}>{amount} ml</span>
          <button
            className={css.icon}
            onClick={() => handleAmountAdjustment(50)}
          >
            <svg width="24" height="24" stroke=" #407bff">
              <use href="/src/assets/img/icons.svg#icon-plus"></use>
            </svg>
          </button>
        </div>

        <p className={css.small_text}>Recording time:</p>
        <input
          className={css.input}
          type="time"
          value={currentTime.toTimeString().substring(0, 5)} 
          onChange={handleTimeChange} 
        />

        <p className={css.large_text}>Enter the value of the water used:</p>
        <input
          className={css.input}
          type="text"
          value={amount} 
          onChange={handleInputAmountChange} 
        />

        <div className={css.buttonSaveContainer}>
          <h2 className={css.amountDown}>{amount} ml</h2>
          <button className={css.buttonSave} type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
