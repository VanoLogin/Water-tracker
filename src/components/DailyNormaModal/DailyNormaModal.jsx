import css from "./DailyNormaModal.module.css";
import Modal from "../Modal/Modal";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  updateUserAmountOfWater,
} from "../../redux/user/operations";
import { selectUserWaterAmount,selectUserData } from "../../redux/user/selectors";
// import ButtonComponent from "../Modal/ButtonComponent/ButtonComponent";

export default function DailyNormaModal({ isOpen, onClose, setIsOpen, setIsUpdate }) {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData)
  const [gender, setGender] = useState("For women");
  const [weight, setWeight] = useState(0);
  const [activityTime, setActivityTime] = useState(0);
  const [requiredWater, setRequiredWater] = useState(1.8);
  const [consumedWater, setConsumedWater] = useState(0);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUser());
    }
  }, [isOpen, dispatch]);

  const weightInKg = parseFloat(weight);
  const activityInHours = parseFloat(activityTime);

  const calculateWaterRequirement = () => {
    let waterAmount = 0;
    if (
      isNaN(weightInKg) ||
      weightInKg <= 0 ||
      isNaN(activityInHours) ||
      activityInHours < 0
    ) {
      setRequiredWater(0);

      return;
    }

    if (gender === "For women") {
      waterAmount = weightInKg * 0.03 + activityInHours * 0.4;
    } else if (gender === "For man") {
      waterAmount = weightInKg * 0.04 + activityInHours * 0.6;
    }

    setRequiredWater(waterAmount.toFixed(2));
  };
  const handleSave = async () => {
    const obj = {
      waterAmount: Number(consumedWater),
    };
    dispatch(updateUserAmountOfWater(obj)).then(() => {
      dispatch(fetchUser());
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal modalTitle="My daily norma" onClose={onClose} setIsOpen={setIsOpen} isOpen={isOpen}>
      <div className={css.formula_div}>
        <p>
          {" "}
          For women: <span className={css.formula}>V=(M*0,03) + (T*0,4)</span>
        </p>
        <p>
          {" "}
          For men: <span className={css.formula}>V=(M*0,04) + (T*0,6)</span>
        </p>
      </div>
      <p className={css.instruction_text}>
        <span className={css.star}>* </span>V is the volume of the water norm in
        liters per day, M is your body weight, T is the time of active sports,
        or another type of activity commensurate in terms of loads (in the
        absence of these, you must set 0)
      </p>
      <form>
        <p className={css.large_text}>Calculate your rate</p>
        <div className={css.formula_div}>
          <label className={css.small_text}>
            <input
              type="radio"
              value="For women"
              checked={gender === "For women"}
              onChange={() => setGender("For women")}
            />
            For women
          </label>
          <label className={css.small_text}>
            <input
              type="radio"
              value="For man"
              checked={gender === "For man"}
              onChange={() => setGender("For man")}
            />
            For man
          </label>
        </div>
        <div>
          <p className={css.small_text}> Your weight in kilograms:</p>
          <input
            className={css.input}
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onBlur={calculateWaterRequirement}
          />
        </div>
        <div>
          <p className={css.small_text}>
            The time of active participation in sports or other activities with
            a high physical. load in hours:{" "}
          </p>
          <input
            className={css.input}
            type="text"
            value={activityTime}
            onChange={(e) => setActivityTime(e.target.value)}
            onBlur={calculateWaterRequirement}
          />
        </div>
        <div>
          <p className={css.small_text}>
            The required amount of water in liters per day:{" "}
            <span className={css.liters}>{requiredWater}</span>
          </p>
        </div>
        <div>
          <p className={css.small_text}>
            Write down how much water you will drink:{" "}
          </p>

          <input
            className={css.input}
            type="text"
            value={consumedWater}
            onChange={(e) => setConsumedWater(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        {/* <div className={css.btn_save}>
            <ButtonComponent text="Save" onClick={handleSave} />
          </div> */}
      </form>
    </Modal>
  );
}
