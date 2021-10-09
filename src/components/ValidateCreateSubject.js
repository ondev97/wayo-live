export default function ValidateSubjectCreateForm(values, isFree) {
  let errors = {};
  if (values.event_category === null) {
    errors.event_category = "Event Category Is Required";
  }
  if (!values.event_category) {
    errors.event_category = "Event Category Is Required";
  }
  if (!values.event_name.trim()) {
    errors.event_name = "Event Name Is Required";
  }
  if (values.event_name.length > 45) {
    errors.event_name = "Event Name Is Must Be Less Than 45 Characters";
  }
  if (!values.event_short_description.trim()) {
    errors.event_short_description = "Event Short Description Is Required";
  }
  if (values.event_short_description.length > 80) {
    errors.event_short_description =
      "Event Short Description Must Be Less Than 80 Characters";
  }
  if (!values.event_label.trim()) {
    errors.event_label = "Event Label Is Required";
  }
  if (values.event_label.length > 14) {
    errors.event_label = "Event Label Is Must Be Less Than 14 Characters";
  }
  if (!isFree) {
    if (values.event_price === 0) {
      errors.event_price = "Please Enter Price";
    }
    if (values.event_price.length > 11) {
      errors.event_price = "Event Pice Is Must Be Less Than 11 Characters";
    }
  }
  if (values.event_content.length > 500) {
    errors.event_content = "Event Description Must Be Less Than 500 Characters";
  }
  if (!values.event_audience_limit) {
    if (!values.event_audience_limit.trim()) {
      errors.event_audience_limit = "Event Audience Limit Is Required";
    }
  }

  return errors;
}
