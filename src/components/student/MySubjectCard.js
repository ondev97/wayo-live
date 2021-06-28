import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function MySubjectsCard({
  id,
  subject_name,
  band_image,
  description,
}) {
  return (
    <div className="al_sub_card">
      <Link to={`/audiencedashboard/eventsinband/${id}`}>
        <div className="sub_card_row">
          <div className="image_sub">
            <LazyLoadImage effect="blur" src={band_image} alt="band" />
          </div>
        </div>
        <div className="sub_card_row">
          <h3>{subject_name}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}
