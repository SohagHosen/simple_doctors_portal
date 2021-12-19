import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

export default function MyTimePicker({ time, setTime, setAvailableTime }) {
  const handleChange = (newValue) => {
    setTime(newValue);
    fetch(`http://localhost:5000/checkAvailableTime/${time}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableTime(data.message);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        value={time}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleChange}
            sx={{ width: "90%", m: 1 }}
            required
          />
        )}
      />
    </LocalizationProvider>
  );
}
