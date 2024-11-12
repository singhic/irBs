import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BusRoute } from './types.ts';
import styles from './BusSchedule.module.css';

interface ScheduleCardProps {
  route: BusRoute;
  schedule: {
    toSchool: string[];
    fromSchool: string[];
  };
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ route, schedule }) => {
  const navigate = useNavigate();

  // 배열을 "/ "로 구분된 문자열로 변환
  const toSchoolTimes = schedule.toSchool.join(' / ');
  const fromSchoolTimes = schedule.fromSchool.join(' / ');

  // 카드 클릭 시 이동하는 함수
  const handleClick = () => {
    navigate(`/SeatMap?lineCode=${route.value}`);
  };

  return (
    <div className={styles.scheduleCard} onClick={handleClick}>
      <h3 className={styles.locationName}>{route.location}</h3>
      <div className={styles.departureTime}>
        <p className={styles.timeText}>등교: {toSchoolTimes || '배차 없음'}</p>
        <p className={styles.timeText}>하교: {fromSchoolTimes || '배차 없음'}</p>
      </div>
    </div>
  );
};

export default ScheduleCard;
