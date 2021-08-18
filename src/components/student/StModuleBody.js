import React from "react";
import { Link } from "react-router-dom";

export default function StModuleBody({ children, name, id }) {
  return (
    <div className="al_on_model">
      <div className="on_model_head">
        <h1>{name || ""}</h1>
        <Link to={`/audiencedashboard/form/${id}`}>
          To Leave <i className="fas fa-chevron-circle-right"></i>
        </Link>
      </div>
      {children}
    </div>
  );
}
