import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function AllSubCard({ subject }) {
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  return (
    <div className="subject_in_cards">
      <div className="subject_head">
        <div className="subject_img">
          <LazyLoadImage
            src={`${subject.event_cover}`}
            alt="subjects"
            effect="blur"
            width="100%"
            height="100%"
          />
        </div>
        <div className="teach_img">
          <h3>{subject.event_price > 0 ? "PAID" : "FREE"}</h3>
        </div>
      </div>
      <div className="subject_body">
        <h4>
          {tConvert(subject.event_start)} {subject.event_date}
        </h4>
        <p>{subject.event_name}</p>
        <div className="row_sim">
          <h3>
            <i class="fas fa-music"></i> {subject.event_label}
          </h3>
          <h3>{subject.event_type.toUpperCase()}</h3>
        </div>
      </div>
    </div>
  );
}
