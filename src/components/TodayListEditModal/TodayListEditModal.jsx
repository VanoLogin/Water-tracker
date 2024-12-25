import style from "./TodayListEditModal.module.css";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import IconComponent from "../IconComponent/IconComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useDispatch } from "react-redux";
import { patchWater } from "../../redux/water/operations";

export default function TodayListEditModal({ onClose, isOpen, setIsOpen, id }) {
  const [amount, setAmount] = useState(50);
  const [inputAmount, setInputAmount] = useState("50");
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const formatCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };
    setCurrentTime(formatCurrentTime());
  }, []);

  const handleSave = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const isoDateTime = `${formattedDate}T${currentTime}:00`; // Додаємо секунди до ISO формату
    console.log(isoDateTime);

    dispatch(patchWater({
      id: id, 
      patchedData: { 
        waterVolume: amount,
        date: isoDateTime,  
      }
    }))
    .then(() => {
      onClose();
    })
    .catch((error) => {
      console.error("Error updating water volume:", error);
    });
  };

  const handleTimeChange = (event) => {
    setCurrentTime(event.target.value);
  };

  const handleInputAmountChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); 
    let numericValue = parseInt(value, 10);

    if (numericValue > 5000) {
      setInputAmount("5000");
      setAmount(5000);
      setError("The maximum amount is 5000 ml");
    } else {
      setInputAmount(value || "0");
      setAmount(numericValue || 0);
      setError(null);
    }
  };

  const handleAmountAdjustment = (adjustment) => {
    setAmount((prevAmount) => {
      const newAmount = Math.max(0, Math.min(5000, prevAmount + adjustment));
      setInputAmount(newAmount.toString());
      setError(null);
      return newAmount;
    });
  };

  return (
    <Modal modalTitle="Edit the entered amount of water" onClose={onClose} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={style.conteiner}>
        <div className={style.glass}>
          <IconComponent
            id="glass"
            width="36"
            height="36"
            fillColor="#407BFF"
          />
          <span className={style.number}>{amount} ml</span>
          <span className={style.numberTime}>{currentTime}</span>
        </div>
        <p className={style.large_text}>Correct entered data:</p>
        <p className={style.small_text}>Amount of water:</p>
        <div className={style.div}>
          <button
            className={style.icon}
            onClick={() => handleAmountAdjustment(-50)}
            disabled={amount <= 0}
          >
            <svg width="24" height="24" fill="#407bff">
              <use href="/src/assets/img/icons.svg#icon-minus"></use>
            </svg>
          </button>
          <span className={style.amount}>{amount} ml</span>
          <button
            className={style.icon}
            onClick={() => handleAmountAdjustment(50)}
            disabled={amount >= 5000}
          >
            <svg width="24" height="24" stroke="#407bff">
              <use href="/src/assets/img/icons.svg#icon-plus"></use>
            </svg>
          </button>
        </div>

        <p className={style.small_text}>Recording time:</p>
        <input
          className={style.input}
          type="time"
          value={currentTime}
          onChange={handleTimeChange}
        />

        <p className={style.large_text}>Enter the value of the water used:</p>
        <input
          className={style.input}
          type="text"
          value={inputAmount}
          onChange={handleInputAmountChange}
          maxLength={5}
        />
        {error && <p className={style.error}>{error}</p>}

        <div className={style.buttonSaveSec}>
          <span className={style.amountSave}>{amount} ml</span>
          <ButtonComponent width="100%" text="Save" onClick={handleSave} />
        </div>
      </div>
    </Modal>
  );
}
  