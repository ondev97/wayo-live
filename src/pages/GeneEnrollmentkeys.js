import React from "react";
import { Link, matchPath, Route, useLocation } from "react-router-dom";
import GenerateKeys from "../components/GenerateKeys";
import ViewIssuedKeys from "./ViewIssuedKeys";
import "../assets/css/geneenrollmentkeys.css";
import "../assets/css/mediaFiles/enrollmentkey.css";

function GeneEnrollmentkeys() {
  let location = matchPath(useLocation().pathname, {
    path: ["/band/ticket/genticket/:id", "/band/ticket/viewticket/:id"],
    exact: true,
    strict: false,
  });

  return (
    <div className="main_sub">
      <div className="simple_nav">
        <Link to={`/band/ticket/genticket/${location.params.id}`}>
          Generate Tickets
        </Link>
        <Link to={`/band/ticket/viewticket/${location.params.id}`}>
          View Tickets
        </Link>
      </div>
      <div className="show">
        <div className="back">
          <Link to={`/band/event/${location.params.id}/`}>
            <button>
              <i className="fas fa-chevron-circle-left"></i>Back to Event
            </button>
          </Link>
        </div>
        <Route path="/band/ticket/genticket/:id">
          <GenerateKeys />
        </Route>
        <Route path="/band/ticket/viewticket/:id">
          <ViewIssuedKeys />
        </Route>
      </div>
    </div>
  );
}

export default GeneEnrollmentkeys;
