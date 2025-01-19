import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimePicker.css"; 

const DateTimePicker = ({ onCancel, onApply }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    period: new Date().getHours() >= 12 ? "PM" : "AM",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (type, value) => {
    setSelectedTime((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleApply = () => {
    const date = new Date(selectedDate);
    let hours = parseInt(selectedTime.hours);
    if (selectedTime.period === "PM" && hours !== 12) {
      hours += 12;
    } else if (selectedTime.period === "AM" && hours === 12) {
      hours = 0;
    }
    date.setHours(hours, selectedTime.minutes);
    onApply(date);
  };

  return (
    <div className="date-time-picker">
      <div className="date-picker">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          dateFormat="MMMM yyyy"
          showMonthDropdown
          showYearDropdown
        />
      </div>
      <div className="time-picker">
        <select
          value={selectedTime.hours}
          onChange={(e) => handleTimeChange("hours", e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        :
        <select
          value={selectedTime.minutes}
          onChange={(e) => handleTimeChange("minutes", e.target.value)}
        >
          {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select
          value={selectedTime.period}
          onChange={(e) => handleTimeChange("period", e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <div className="actions">
        <button onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button onClick={handleApply} className="apply-btn">
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateTimePicker;
