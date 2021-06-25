import React from "react";
import { Link } from "react-router-dom";

export default function MyCourseCard({ event }) {
  return (
    <Link
      to={event.is_freeze ? `#` : `/audiencedashboard/envetdetails/${event.id}`}
    >
      <div
        className={
          event.is_freeze
            ? `st_grid_card_manage freezeCard`
            : `st_grid_card_manage`
        }
      >
        <div className="st_grid_card_mg_head">
          <h3>{event.event_date}</h3>
          <h3>{event.event_start}</h3>
          <h3 className="label">{event.event_label}</h3>
        </div>
        <div className="st_grid_card_mg_body">
          <h3>{event.event_name || ""}</h3>
          <h3>{event.description || ""}</h3>
          <h3>{event.event_type || ""}</h3>
          <h3>{event.event_mode ? event.event_mode.event_mode_name : ""}</h3>
        </div>
        <div className="st_grid_card_mg_tail">
          {event.event_price && !event.is_enrolled ? (
            <button>RS: {event.event_price}</button>
          ) : (
            ""
          )}
          <button>VIEW EVENT</button>
        </div>
      </div>
    </Link>
  );
}
