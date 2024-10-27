import React from "react";

interface RouteCardProps {
    destination: string;
    time: string;
    seats: string;
  }
  
  export const RouteCard: React.FC<RouteCardProps> = ({ destination, time, seats }) => {
    return (
      <article className="route-card">
        <div className="route-info">
          <h3 className="route-destination">{destination}</h3>
          <time className="route-time">{time}</time>
        </div>
        <p className="route-seats">{seats}</p>
      </article>
    );
  };