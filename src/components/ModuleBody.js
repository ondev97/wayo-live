import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

function ModuleBody({ children, name, id, handelDeleteModule, cid }) {
  return (
    <div layout className="al_on_model">
      <div layout className="on_model_head">
        <h1>{name}</h1>
        <div className="heads_buts">
          <Link to={`/teacherdashboard/updatemodule/${id}/${cid}`}>
            <button>
              <i className="fas fa-edit"></i>
            </button>
          </Link>
          <button onClick={() => handelDeleteModule(id)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ModuleBody;
