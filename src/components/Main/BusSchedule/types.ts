export interface BusRoute {
    location: string;
    value: string;
    schedule: {
      toSchool: string[];
      fromSchool: string[];
    };
  }
  
  export interface ScheduleCardProps {
    route: BusRoute;
  }