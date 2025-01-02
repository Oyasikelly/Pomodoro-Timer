import React, { useState } from "react";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import "./scss/main.scss";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState("25:00");
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);

  const handleBreakDecrement = () => {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (!isRunning) setTimeLeft(`${sessionLength - 1}:00`);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (!isRunning) setTimeLeft(`${sessionLength + 1}:00`);
    }
  };

  const handleStartStop = () => {
    if (isRunning) {
      // Pause the timer
      clearInterval(window.timerInterval);
    } else {
      // Start the timer
      window.timerInterval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const [minutes, seconds] = prevTimeLeft.split(":").map(Number);
          const totalSeconds = minutes * 60 + seconds - 1;

          if (totalSeconds < 0) {
            // Handle timer reaching zero
            clearInterval(window.timerInterval);
            const newLabel = timerLabel === "Session" ? "Break" : "Session";
            setTimerLabel(newLabel);
            const newTime =
              newLabel === "Session"
                ? `${sessionLength}:00`
                : `${breakLength}:00`;
            return newTime;
          }

          const newMinutes = Math.floor(totalSeconds / 60);
          const newSeconds = totalSeconds % 60;
          return `${newMinutes.toString().padStart(2, "0")}:${newSeconds
            .toString()
            .padStart(2, "0")}`;
        });
      }, 1000);
    }

    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft("25:00");
    setTimerLabel("Session");
    setIsRunning(false);

    clearInterval(window.timerInterval);

    const audio = document.getElementById("beep");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <div className="app">
      <Timer timerLabel={timerLabel} timeLeft={timeLeft} />
      <Controls
        breakLength={breakLength}
        sessionLength={sessionLength}
        onBreakDecrement={handleBreakDecrement}
        onBreakIncrement={handleBreakIncrement}
        onSessionDecrement={handleSessionDecrement}
        onSessionIncrement={handleSessionIncrement}
        onStartStop={handleStartStop}
        onReset={handleReset}
      />
      <audio
        id="beep"
        src="https://www.soundjay.com/button/beep-07.wav"
      ></audio>
    </div>
  );
};

export default App;
