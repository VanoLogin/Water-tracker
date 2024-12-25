import css from './DailyNorma.module.css'
import { useSelector } from 'react-redux'
import { selectUserData, selectUserWaterAmount } from "../../redux/user/selectors"
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal"
import { useState, useEffect } from 'react';


export default function DailyNorma() {
   
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [update, setUpdate] = useState(false);

const userData = useSelector(selectUserData)
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

    return (
        <div className={css.container}>
          <div className={css.waterDailyContainer}>
            <p className={css.waterDailyText}>My daily norma</p>
            <div className={css.dailyNormaContainer}>
            <h2 className={css.waterDailyTitle}>{userData?.waterAmount}L</h2>
              <button type="button" className={css.editbutton} onClick={handleOpenModal}>Edit</button>
            </div>
            <DailyNormaModal
              closeModal={handleCloseModal}
            isOpen={modalIsOpen}  onClose={handleCloseModal} setIsOpen={setModalIsOpen} setIsUpdate={setUpdate}/>
          
          </div>
        </div>
    )
}