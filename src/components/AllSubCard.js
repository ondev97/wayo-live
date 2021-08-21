import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function AllSubCard({ subject }) {
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
          <h3>{subject.event_price > 500 ? "PAID" : "FREE"}</h3>
        </div>
      </div>
      <div className="subject_body">
        <h4>
          {subject.event_start} {subject.event_date}
        </h4>
        <p>
          {subject.band.user.first_name + " " + subject.band.user.last_name}
        </p>
        <div className="row_sim">
          <h3>{subject.event_label}</h3>
          <h3>{subject.event_type.toUpperCase()}</h3>
        </div>
      </div>
    </div>
  );
}
