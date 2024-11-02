import React from "react";
import DatePicker from "react-datepicker";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerComponent = ({ onChange, value }) => {
  return <DatePicker onChange={onChange} value={value} />;
};

export default DatePickerComponent;
