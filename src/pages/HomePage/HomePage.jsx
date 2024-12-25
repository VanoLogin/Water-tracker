import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import css from './HomePage.module.css'
import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import TodayListModal from '../../components/TodayListModal/TodayListModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData, selectUserInfo } from '../../redux/user/selectors';

export default function HomePage() {
  
  return (
    <div className={css.container}>
          <div>
            <div className={css.bottleBG}>
              <DailyNorma />
            </div>
              <WaterRatioPanel />
          </div>
          <div className={css.calendarBox}>
            <div className={css.calendarWrapper}>
              <TodayWaterList/>
              <MonthStatsTable />
            </div>
          </div>
    </div>
  );
}
