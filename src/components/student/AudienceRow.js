import React from "react";

function AudienceRow({ data }) {
  return (
    <div>
      <div className="audience_row" key={data.id}>
        <div className="audience_pro_pic">
          <img src={data.user_image} />
        </div>
        <div className="audience_names">
          <h1>{data.user.first_name}</h1>
        </div>
      </div>
    </div>
  );
}

export default AudienceRow;
