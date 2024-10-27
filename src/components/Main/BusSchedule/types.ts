export interface BusRoute {
    location: string;
    schedule: {
      toSchool: string[];
      fromSchool: string[];
    };
  }
  
  export interface ScheduleCardProps {
    route: BusRoute;
  }