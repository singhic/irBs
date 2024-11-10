import React from 'react';
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
  // 배열을 "/ "로 구분된 문자열로 변환
  const toSchoolTimes = schedule.toSchool.join(' / ');
  const fromSchoolTimes = schedule.fromSchool.join(' / ');

  return (
    <div className={styles.scheduleCard}>
      <h3 className={styles.locationName}>{route.location}</h3>
      <div className={styles.departureTime}>
        <p>등교: {toSchoolTimes || '배차 없음'}</p> {/* 등교 시간 */}
        <p>하교: {fromSchoolTimes || '배차 없음'}</p> {/* 하교 시간 */}
      </div>
    </div>
  );
};

export default ScheduleCard;