import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function SelectStudentsTopRow({
  addedProfile,
  setselectst,
  setaddedProfile,
  selectst,
  addStudemts,
}) {
  /*Remove From students row*/
  const removeTop = (index) => {
    let carr = [...addedProfile];
    let searr = [...selectst];
    searr.splice(index, 1);
    carr.splice(index, 1);
    setaddedProfile(carr);
    setselectst(searr);
  };

  return (
    <div>
      {Object.keys(addedProfile).length !== 0 ? (
        <div className="top_head_row">
          <div className="select_row">
            <div className="card_row">
              {Object.values(addedProfile).map((data, index) => (
                <>
                  <div className="scard" key={index}>
                    <div className="relcard">
                      <div className="rembut">
                        <button onClick={() => removeTop(index)}>
                          <i className="fas fa-minus-circle"></i>
                        </button>
                      </div>
                      <div className="sestimage">
                        <LazyLoadImage
                          src={data.img}
                          effect="blur"
                          alt={data.un}
                        />
                      </div>
                    </div>
                    <div className="name">
                      <h3>{data.un}</h3>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="added_main">
            <button title="Add Students" onClick={addStudemts}>
              <i className="fas fa-chevron-circle-right"></i>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
