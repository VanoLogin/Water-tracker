import React from 'react';
import css from './MonthStatsItem.module.css';
import { useSelector } from 'react-redux';
import { selectTodayWaterPercentage } from '../../../redux/water/selectors';

const MonthStatsItem = ({ day, openModal }) => {
  const dayNum = day.date.split(',')[0].trim();
  
  const handleClick = () => {
    openModal(day);  
  };

  return (
    <div className={css.calendarDay}>
      <div className={css.dayNumber} onClick={handleClick}>
        {dayNum}
      </div>
      <div className={css.dailyTotal}>{parseInt(day.waterPercent)}%</div>
    </div>
  );
}

export default MonthStatsItem;
