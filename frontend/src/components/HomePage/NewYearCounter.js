import React, { useState, useEffect } from "react";
const calculateNewYear = timezone => {
  let offset;
  switch (timezone) {
    case "UTC":
      offset = 0;
      break;
    case "EST":
      offset = -240; // EST is 4 hours behind UTC
      break;
    case "CST":
      offset = -360; // CST is 6 hours behind UTC
      break;
    case "PST":
      offset = -420; // PST is 7 hours behind UTC
      break;
    default:
      offset = 0;
  }
  let currentDate = new Date();
  let newYearDate = new Date(currentDate.getFullYear() + 1, 0, 1);
  newYearDate.setMinutes(newYearDate.getMinutes() + offset);
  return newYearDate;
};
const NewYearCounter = () => {
  const [timezone, setTimezone] = useState("UTC");
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [newYear, setNewYear] = useState(calculateNewYear("UTC"));

  useEffect(() => {
    let intervalId = setInterval(() => {
      setNewYear(calculateNewYear(timezone));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timezone]);

  const handleTimezoneChange = e => {
    setTimezone(e.target.value);
    setSelectedTimezone(e.target.value);
  };

  let timeLeft = newYear - new Date();
  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      <div className="NewYearDiv">
        <p>
          {`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
        </p>
      </div>
      <div>
        <select
          className="TimezoneDiv"
          value={selectedTimezone}
          onChange={handleTimezoneChange}
        >
          <option value="UTC">Coordinated Universal Time (UTC)</option>
          <option value="EST">Eastern Standard Time (EST)</option>
          <option value="CST">Central Standard Time (CST)</option>
          <option value="PST">Pacific Standard Time (PST)</option>
        </select>
      </div>
    </div>
  );
};

export default NewYearCounter;
