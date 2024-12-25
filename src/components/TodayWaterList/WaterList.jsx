import React, { useEffect, useMemo } from 'react';
import WaterListItem from './WaterListItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodayWater } from '../../redux/water/selectors';
import { getTodayWater } from '../../redux/water/operations';
import css from './WaterList.module.css';

export default function WaterList() {
  const dayArr = useSelector(selectTodayWater) || [];
  const dispatch = useDispatch();

  const obj = useMemo(() => {
    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
console.log(dayArr)
    return {
      date: getTodayDate(),
    };
  }, []);

  useEffect(() => {
    dispatch(getTodayWater(obj));
  }, [dispatch, obj, dayArr]);

  return (
    <ul className={css.list}>
      {dayArr.length > 0 ? (
        dayArr.map((d, index) => (
          <li key={d._id || index}> 
            <WaterListItem day={d} />
          </li>
        ))
      ) : (
        <li>No notes yet</li>
      )}
    </ul>
  );
}
