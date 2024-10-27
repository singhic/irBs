export interface SeatProps {
    number: string;
    type: 'red' | 'grey' | 'green';
    selected?: boolean;
  }
  
  export interface SeatRowProps {
    seats: SeatProps[];
  }
  
  export interface LegendItemProps {
    icon: string;
    text: string;
  }