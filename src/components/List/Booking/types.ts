export interface BookingData {
  route: string;
  date: string;
  time: string;
  seatNumber: string;
  status: "BOARDED" | "NOT_BOARDED" | "CANCELLED";
}
