import React, { useState } from "react";

const DateTimePicker = ({ maxMonths = 1, selectedDate, setSelectedDate }) => {
  // maxMonths prop to control how many months ahead to allow
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const generateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate max future date
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + maxMonths);

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const dates = [];
    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      dates.push(null);
    }

    // Add the actual dates
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(currentYear, currentMonth, i);
      currentDate.setHours(0, 0, 0, 0);
      dates.push(currentDate);
    }
    return { dates, today, maxDate };
  };

  const { dates, today, maxDate } = generateDates();

  const isDateDisabled = (date) => {
    if (!date) return true;
    return date < today || date > maxDate;
  };

  const handleMonthChange = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    // Check if the new month/year is within allowed range
    const newDate = new Date(newYear, newMonth, 1);
    const maxAllowedDate = new Date(today);
    maxAllowedDate.setMonth(today.getMonth() + maxMonths);

    if (increment < 0 && newDate < today) return;
    if (increment > 0 && newDate > maxAllowedDate) return;

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleDateSelect = (date) => {
    if (!date || isDateDisabled(date)) return;

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };

  const ChevronLeft = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const ChevronRight = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const isCurrentMonth = () => {
    const today = new Date();
    return (
      currentMonth === today.getMonth() && currentYear === today.getFullYear()
    );
  };

  const isMaxMonth = () => {
    const maxMonth = new Date(today);
    maxMonth.setMonth(today.getMonth() + maxMonths);
    return (
      currentYear === maxMonth.getFullYear() &&
      currentMonth === maxMonth.getMonth()
    );
  };

  return (
    <div className="w-full h-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mb-10">
      <div className="relative">
        <div
          className="flex items-center border rounded-lg p-2 cursor-pointer hover:bg-gray-50"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CalendarIcon />
          <span className="ml-2">{selectedDate || "Select Date"}</span>
        </div>

        {showCalendar && (
          <div className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg p-4 mb-10">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleMonthChange(-1)}
                disabled={isCurrentMonth()}
                className={`p-1 rounded-full hover:bg-gray-100 
                  ${
                    isCurrentMonth()
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600"
                  }`}
              >
                <ChevronLeft />
              </button>
              <h2 className="text-lg font-semibold text-gray-700">
                {new Date(currentYear, currentMonth).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </h2>
              <button
                onClick={() => handleMonthChange(1)}
                disabled={isMaxMonth()}
                className={`p-1 rounded-full hover:bg-gray-100 
                  ${
                    isMaxMonth()
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600"
                  }`}
              >
                <ChevronRight />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-gray-600 p-2"
                >
                  {day}
                </div>
              ))}
              {dates.map((date, index) => {
                const isToday =
                  date &&
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();

                const isDisabled = isDateDisabled(date);
                const isSelected =
                  date &&
                  selectedDate ===
                    date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });

                return (
                  <div
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`
                      text-center p-2 relative
                      ${!date ? "text-gray-300" : ""}
                      ${
                        isDisabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "cursor-pointer hover:bg-blue-50"
                      }
                      ${isToday ? "bg-blue-100" : ""}
                      ${
                        isSelected
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : ""
                      }
                      rounded
                    `}
                  >
                    {date ? date.getDate() : ""}
                    {isToday && !isSelected && (
                      <div className="h-1 w-1 bg-blue-500 rounded-full mx-auto mt-1" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 text-xs text-gray-500 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-100 rounded" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span>Selected</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedDate && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Selected Date:</p>
          <p className="font-semibold">{selectedDate}</p>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
