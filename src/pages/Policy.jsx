import React, { useState, useEffect } from "react";

const Policy = () => {
  // Predefined sequence of times (in seconds)
  const sequence = [2 * 60 * 60, 1 * 60 * 60 + 58 * 60 + 57];
  const [customTime, setCustomTime] = useState(""); // User-defined time
  const [currentIndex, setCurrentIndex] = useState(0); // Track current sequence step
  const [time, setTime] = useState(sequence[0]); // Current time
  const [isRunning, setIsRunning] = useState(false);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && time === 0 && currentIndex < sequence.length - 1) {
      // Move to next timer in sequence
      setCurrentIndex((prev) => prev + 1);
      setTime(sequence[currentIndex + 1]);
    }
    return () => clearInterval(timer); // Cleanup
  }, [isRunning, time, currentIndex, sequence]);

  const handleStart = () => {
    if (time > 0) setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentIndex(0);
    setTime(sequence[0]); // Reset to default
  };

  const handleSetTime = () => {
    const [hrs, mins, secs] = customTime.split(":").map((val) => parseInt(val, 10) || 0);
    const newTime = hrs * 3600 + mins * 60 + secs;
    if (!isNaN(newTime) && newTime > 0) {
      setIsRunning(false);
      setTime(newTime);
      setCurrentIndex(0); // Start custom time independently of the sequence
    }
  };

  // Format time in HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Countdown Timer</h1>
      <h2>{formatTime(time)}</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleStart} disabled={isRunning || time === 0}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="HH:MM:SS"
          value={customTime}
          onChange={(e) => setCustomTime(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSetTime}>Set Time</button>
      </div>
      <p>
        Current Timer: {currentIndex + 1} of {sequence.length} (Sequence Mode)
      </p>
    </div>
  );
};

export default Policy;
