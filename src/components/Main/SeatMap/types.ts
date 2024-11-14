// SeatProps 인터페이스 정의
export interface SeatProps {  
  seatNumber: string; // 좌석 번호
  initialStatus: 'available' | 'reserved' | 'selected'; // 좌석 상태
  onSelect?: (seatNumber: string) => void; // 선택 시 호출되는 함수 (선택적)
}

// DateButtonProps 인터페이스 정의
export interface DateButtonProps {  
  day: string; // 요일
  date: string; // 날짜
  isActive?: boolean; // 활성화 여부 (선택적)
  onClick?: () => void; // 클릭 시 호출되는 함수 (선택적)
}

// ScheduleCardProps 인터페이스 정의
export interface ScheduleCardProps {  
  time: string; // 시간
  availableSeats: number; // 사용 가능한 좌석 수
  waitingCount: number; // 대기 인원 수
  value: string;
  index: number;
  isActive?: boolean; // 활성화 여부 (선택적)
  onClick?: (index:number) => void; // 클릭 시 호출되는 함수 (선택적)
}

// LegendItemProps 인터페이스 정의
export interface LegendItemProps {  
  icon: string; // 아이콘 이미지 경로
  label: string; // 라벨 텍스트
  alt: string; // 이미지 대체 텍스트
}
