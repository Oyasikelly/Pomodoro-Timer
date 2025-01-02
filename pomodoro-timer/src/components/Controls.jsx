import React from "react";
import "../scss/components/Controls.scss";

const Controls = ({
  breakLength,
  sessionLength,
  onBreakDecrement,
  onBreakIncrement,
  onSessionDecrement,
  onSessionIncrement,
  onStartStop,
  onReset,
}) => {
  return (
    <div className="controls">
      <div className="break-controls">
        <h3 id="break-label">Break Length</h3>
        <div>
          <button id="break-decrement" onClick={onBreakDecrement}>
            -
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={onBreakIncrement}>
            +
          </button>
        </div>
      </div>

      <div className="session-controls">
        <h3 id="session-label">Session Length</h3>
        <div>
          <button id="session-decrement" onClick={onSessionDecrement}>
            -
          </button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={onSessionIncrement}>
            +
          </button>
        </div>
      </div>

      <div className="timer-controls">
        <button id="start_stop" onClick={onStartStop}>
          Start/Stop
        </button>
        <button id="reset" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Controls;
