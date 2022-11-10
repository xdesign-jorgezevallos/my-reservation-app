import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, TextField, Button, Card, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import TemplateBase from "../../components/commons/TemplateBase/TemplateBase";
import { ReservationState } from "../../interfaces/reservationType";
import { RootState } from "../../store";
import {
  fetchReservations,
  fetchUserReservations,
  selectedReservation,
  cancelReservation
} from "../../store/reservationSlice";

export const ReservationsPagePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reservations } = useSelector((state: RootState) => state.reservations);
  const { user } = useSelector((state: RootState) => state.auth);
  const [dateSelected, setDateSelected] = useState<Date>(new Date());

  const loadReservation = useCallback(() => {
    if (user.role === "Admin") {
      dispatch(fetchReservations(dateSelected) as any);
    }
    if (user.role === "User") {
      dispatch(fetchUserReservations({ date: dateSelected, uid: user.userUID }) as any);
    }
  }, [dispatch, dateSelected, user.role, user.userUID]);

  const handleDateSelector = (date: Date | null) => {
    setDateSelected(date as Date);
    loadReservation();
  };

  const selectReservation = (reservation: any) => {
    dispatch(selectedReservation(reservation))
  }

  const handleCcanceReservation = (reservation: any) => {
     const { id } = reservation;
     dispatch(cancelReservation({reservationUID:id, reservationData: reservation }) as any)
  }

  useEffect(() => {
    loadReservation();
  }, [loadReservation]);

  return (
    <TemplateBase>
      <div>
        <h1>Reservations</h1>
        <Stack direction="row" style={{ backgroundColor: "#EBEDEF ", borderRadius: "5px", padding: "20px", marginLeft: "50px", marginRight: "50px" }}>
          <Stack direction="column" style={{ width: "60%", marginBottom: 30, alignItems: "start" }} spacing={2}>
            <Typography variant="body1">Search Reservation by Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Reservation Date" value={dateSelected} onChange={handleDateSelector} renderInput={(params) => <TextField {...params} />} />
            </LocalizationProvider>
          </Stack>

          <Stack direction="column" style={{ width: "40%", paddingLeft: "20%", paddingRight: "20%", alignSelf: "end", paddingBottom: "32px" }} spacing={2}>
            <Button variant="outlined" onClick={() => navigate("/reservation")}>
              Book table
            </Button>
          </Stack>
        </Stack>

        <Box style={{ marginLeft: "50px", marginRight: "50px", paddingTop: "1rem" }}>
          {reservations.length > 0 &&
            reservations.map((reservation: ReservationState, index: number) => (
              <Card key={index} style={{ marginTop: ".5rem", padding: "1.5rem" }}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="inherit">Name: </Typography>
                  <Typography variant="body2">{reservation.clientReservation} </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="inherit">Amount paid: </Typography>
                  <Typography variant="body2"> £{reservation.reservationAmount} </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="inherit">Table: </Typography>
                  <Typography variant="body2"> {reservation.table} </Typography>

                  <Typography variant="inherit">Time: </Typography>
                  <Typography variant="body2"> {`${reservation.hour}:00`} </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="inherit">Status: </Typography>
                  <Typography variant="body2"> {reservation.status ? "Reserved" : "Free"} </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="primary" onClick={()=>selectReservation(reservation)} >Modify</Button>
                  <Button variant="contained" color="error" onClick={()=>handleCcanceReservation(reservation)} >Cancel</Button>
                </Stack>
              </Card>
            ))}
        </Box>
      </div>
    </TemplateBase>
  );
};
