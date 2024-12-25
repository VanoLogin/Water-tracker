import WaterList from './WaterList'
import css from './TodayWaterList.module.css'
import TodayListModal from '../TodayListModal/TodayListModal'
import { useState } from 'react'

export default function TodayWaterList() {
     const [isOpen, setIsOpen] = useState(false)

     const handleOpenModal = () => setIsOpen(true);
     const handleCloseModal = () => setIsOpen(false);
    
  
    
    return (
        <div className={css.container}>
            <h2 className={css.title}>Today</h2>
            <WaterList className={css.addWaterBox}/>
            <button className={css.button} type="button" onClick={handleOpenModal}>+ Add water</button>
            {isOpen && <TodayListModal isOpen={isOpen} onClose={handleCloseModal}  setIsOpen={setIsOpen}/>}
        </div>
    )
}