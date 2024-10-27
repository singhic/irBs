export interface SeatProps {
  seatNumber: string;
  status: 'available' | 'reserved' | 'selected';
  color: 'red' | 'grey' | 'green';
  onSelect?: (seatNumber: string) => void;
}

export interface DateButtonProps {
  day: string;
  date: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface ScheduleCardProps {
  time: string;
  availableSeats: number;
  waitingCount: number;
  isActive?: boolean;
  onClick?: () => void;
}

export interface LegendItemProps {
  icon: string;
  label: string;
  alt: string;
}