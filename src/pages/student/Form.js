import React from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/css/student/formStyling.css";

function Form() {
  const { id } = useParams();
  return (
    <div className="form_container">
      <div className="but">
        <Link to={`/audiencedashboard/eventsinband/${id}`}>
          <button>
            To Leave Event <i className="fas fa-chevron-circle-right"></i>
          </button>
        </Link>
      </div>
      <div className="form_box">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeORtbb-FvMNSIHHkqUZwBRxaC8woeRPde7i-DIX9EG8lDitA/viewform?embedded=true"
          width="100%"
          height="3071"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}

export default Form;
