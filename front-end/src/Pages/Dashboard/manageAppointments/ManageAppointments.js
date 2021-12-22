import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const ManageAppointments = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [status, setStatus] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Cancel this appointment?")) {
      axios
        .delete(`http://localhost:5000/appointments/cancel/${id}`)
        .then((res) => {
          if (res.data.deletedCount) {
            const remaining = allAppointments.filter(
              (booking) => booking._id !== id
            );
            setAllAppointments(remaining);
          }
        })
        .catch((err) => console.error(err));
    }
  };
  const handleActive = (id) => {
    axios
      .patch(`http://localhost:5000/appointments/status/${id}`, {
        status: "Approved",
      })
      .then((response) => {
        if (response.data.matchedCount) {
          setStatus(!status);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch("http://localhost:5000/allAppointments")
      .then((response) => response.json())
      .then((data) => setAllAppointments(data));
  }, [status]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Service</TableCell>
            <TableCell align="right">Date & Time</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allAppointments.map((appointment) => (
            <TableRow
              key={appointment._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {appointment.patientName}
              </TableCell>
              <TableCell align="right">{appointment.email}</TableCell>
              <TableCell align="right">{appointment.serviceName}</TableCell>
              <TableCell align="right">{appointment.time}</TableCell>
              <TableCell
                align="right"
                sx={{
                  color: appointment.status === "Approved" ? "green" : null,
                }}
              >
                {appointment.status}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  sx={{ color: "red" }}
                  onClick={() => handleDelete(appointment._id)}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
                <IconButton
                  onClick={() => handleActive(appointment._id)}
                  color="success"
                >
                  <CheckCircleOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageAppointments;
