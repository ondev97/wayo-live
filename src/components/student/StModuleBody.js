import React from "react";

export default function StModuleBody({ children, name }) {
  return (
    <div className="al_on_model">
      <div className="on_model_head">
        <h1>WAYO - Handa Allanna Asa Gamana Live</h1>
      </div>
      {children}
    </div>
  );
}
