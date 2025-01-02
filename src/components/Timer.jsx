import React from "react";
import "../scss/components/timer.scss";

const Timer = ({ timerLabel, timeLeft }) => {
  return (
    <div className="timer">
      <h2 id="timer-label">{timerLabel}</h2>
      <p id="time-left">{timeLeft}</p>
    </div>
  );
};

export default Timer;
