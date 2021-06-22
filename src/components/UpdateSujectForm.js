import React, { useEffect, useRef, useState } from "react";
import { Cropper } from "react-cropper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function UpdateSujectForm({
  hadelChabgeFormValues,
  handelSubmit,
  hideError,
  hide,
  formErrors,
  image,
  getCropData,
  setCropper,
  onChange,
  err,
  showCropper,
  setshowCropper,
  isUploading,
  formValue,
  setformValue,
  cropData,
  setisFree,
  isFree,
}) {
  const isFreeze = useRef();
  const isFreee = useRef();

  useEffect(() => {
    if (formValue.is_freeze) {
      isFreeze.current.checked = true;
    } else {
      isFreeze.current.checked = false;
    }
  }, [formValue.is_freeze]);
  useEffect(() => {
    if (formValue.event_price) {
      if (formValue.event_price > 0) {
        isFreee.current.checked = "true";
        setisFree(false);
      } else {
        isFreee.current.checked = "false";
        setisFree(true);
      }
    }
  }, [formValue]);

  const isChecked = (e) => {
    if (e.target.checked) {
      setisFree(false);
    } else {
      setisFree(true);
      setformValue({ ...formValue, event_price: 0 });
    }
  };

  const isFreezeChecked = (e) => {
    if (e.target.checked) {
      setformValue({ ...formValue, is_freeze: true });
    } else {
      setformValue({ ...formValue, is_freeze: false });
    }
  };

  useEffect(() => {
    console.log(formValue);
    let start_time = formValue.event_start;
    let end_time = formValue.event_end;
    if (start_time && end_time) {
      let start = start_time.split(":");
      let end = end_time.split(":");
      var startDate = new Date(0, 0, 0, start[0], start[1], 0);
      var endDate = new Date(0, 0, 0, end[0], end[1], 0);
      var diff = endDate.getTime() - startDate.getTime();
      var hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      var minutes = Math.floor(diff / 1000 / 60);
      let difference =
        (hours <= 9 ? "0" : "") +
        hours +
        ":" +
        (minutes <= 9 ? "0" : "") +
        minutes;
      setformValue({ ...formValue, event_duration: difference || "" });
    }
  }, [formValue.event_start_time, formValue.event_end_time]);

  return (
    <form onSubmit={handelSubmit}>
      <p>
        <label htmlFor="st">EVENT NAME</label>
        <input
          type="text"
          name="event_name"
          id="st"
          value={formValue.event_name}
          onChange={hadelChabgeFormValues}
          onFocus={hideError}
        />
        {formErrors.event_name && (
          <span className={`tip ${hide.event_name ? "hidetip" : ""}`}>
            {formErrors.event_name}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="ssd">EVENT SHORT DESCRIPTION</label>
        <input
          type="text"
          name="event_short_description"
          id="ssd"
          value={formValue.event_short_description}
          onChange={hadelChabgeFormValues}
          onFocus={hideError}
        />
        {formErrors.event_short_description && (
          <span
            className={`tip ${hide.event_short_description ? "hidetip" : ""}`}
          >
            {formErrors.event_short_description}
          </span>
        )}
      </p>
      <div className="sub_sect">
        <p>
          <label htmlFor="ssd">EVENT LABEL</label>
          <input
            type="text"
            name="event_label"
            id="ssd"
            value={formValue.event_label}
            onChange={hadelChabgeFormValues}
            onFocus={hideError}
          />
          {formErrors.event_label && (
            <span className={`tip ${hide.event_label ? "hidetip" : ""}`}>
              {formErrors.event_label}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="fe">FREEZE EVENT</label>
          <input
            type="checkbox"
            id="fe"
            name="freeze"
            ref={isFreeze}
            onClick={isFreezeChecked}
          />
        </p>
      </div>
      <div className="sub_sect">
        <p>
          <label htmlFor="ssd">EVENT DATE</label>
          <input
            type="date"
            name="event_date"
            id="ssd"
            value={formValue.event_date || ""}
            onChange={hadelChabgeFormValues}
            onFocus={hideError}
          />
          {formErrors.event_date && (
            <span className={`tip ${hide.event_date ? "hidetip" : ""}`}>
              {formErrors.event_date}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="ssd">EVENT START TIME</label>
          <input
            type="time"
            name="event_start"
            id="ssd"
            value={formValue.event_start || ""}
            onChange={hadelChabgeFormValues}
            onFocus={hideError}
          />
          {formErrors.event_start && (
            <span className={`tip ${hide.event_start ? "hidetip" : ""}`}>
              {formErrors.event_start}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="ssd">EVENT END TIME</label>
          <input
            type="time"
            name="event_end"
            id="ssd"
            value={formValue.event_end || ""}
            onChange={hadelChabgeFormValues}
            onFocus={hideError}
          />
          {formErrors.event_end && (
            <span className={`tip ${hide.event_end ? "hidetip" : ""}`}>
              {formErrors.event_end}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="ssd">EVENT DURATION</label>
          <input
            type="text"
            name="subject_shdes"
            id="ssd"
            value={formValue.event_duration || ""}
            onChange={hadelChabgeFormValues}
            onFocus={hideError}
          />
          {formErrors.event_duration && (
            <span className={`tip ${hide.event_duration ? "hidetip" : ""}`}>
              {formErrors.event_duration}
            </span>
          )}
        </p>
      </div>
      <div className="sub_sect">
        <p>
          <label htmlFor="ef">EVENT FEE</label>
          <input
            type="checkbox"
            id="ef"
            name="event_fee"
            onClick={isChecked}
            ref={isFreee}
          />
        </p>
        {!isFree ? (
          <p>
            <label htmlFor="st">PRICE</label>
            <input
              type="text"
              name="event_price"
              id="ssd"
              value={formValue.event_price}
              onChange={hadelChabgeFormValues}
              onFocus={hideError}
            />
            {formErrors.event_price && (
              <span className={`tip ${hide.event_price ? "hidetip" : ""}`}>
                {formErrors.event_price}
              </span>
            )}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="up_pro_pic">
        {showCropper && cropData === "#" && !err.img && (
          <div className="cropper_be">
            <Cropper
              style={{ height: "100%", width: "100%" }}
              initialAspectRatio={4 / 3}
              aspectRatio={4 / 3}
              preview=".img-preview"
              src={image}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          </div>
        )}
        {!showCropper && (
          <div className="finCropImg">
            <LazyLoadImage
              style={{ width: "100%" }}
              src={cropData === "#" ? formValue.event_cover : cropData}
              alt="cropped"
              effect="blur"
              width="100%"
              height="100%"
            />
          </div>
        )}
        <p>
          <label htmlFor="file">Change Event Cover</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => {
              onChange(e);
              setshowCropper(true);
            }}
          />
          {showCropper && cropData === "#" && !err.img ? (
            <button
              className="cp"
              onClick={(e) => {
                getCropData(e);
                setshowCropper(false);
              }}
            >
              Crop Image
            </button>
          ) : (
            ""
          )}
        </p>
      </div>
      <p>
        <label htmlFor="sd">EVENT DESCRIPTION</label>
        <textarea
          name="event_content"
          id="sd"
          rows="10"
          value={formValue.event_content}
          onChange={hadelChabgeFormValues}
          onFocus={hideError}
        ></textarea>
        {formErrors.event_content && (
          <span className={`tip ${hide.event_content ? "hidetip" : ""}`}>
            {formErrors.event_content}
          </span>
        )}
      </p>
      <p>
        <button
          className="sub"
          type={`${isUploading ? "button" : "submit"}`}
          name="create"
        >
          <span>Update Subject</span>{" "}
          <i
            className={`fas fa-circle-notch notch ${!isUploading ? "dis" : ""}`}
          ></i>
        </button>
      </p>
    </form>
  );
}
