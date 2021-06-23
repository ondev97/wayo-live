import React from "react";

function ModuleBody({ children, name }) {
  return (
    <div layout className="al_on_model">
      <div layout className="on_model_head">
        <h1>{name}</h1>
      </div>
      {children}
    </div>
  );
}

export default ModuleBody;
