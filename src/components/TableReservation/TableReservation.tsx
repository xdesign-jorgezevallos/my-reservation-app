import React from "react";
import { Typography, Box } from "@mui/material";
import ReservationFormDialog from "../ReservationFomDialog";

import "./styles.scss";

const dailyHours = [13, 14, 15, 16, 17, 18, 19];

interface ITableReservation {
  id: number;
  bookedHours: number[];
  seats?: number;
  date?: Date;
}

export const TableReservation: React.FC<ITableReservation> = (props: ITableReservation) => {
  const { id, date, bookedHours, seats } = props;

  return (
    <div className="table-reservation">
      <div className="table-reservation__header">
        <Typography variant="h3"> Table{id} - Availability Hours </Typography>
        <Typography variant="body1">{seats} seats</Typography>
      </div>
      {dailyHours.map((hour: number, index: number) => (
        <Box key={`${index}-${hour}`} component="span" m={1} display="flex" justifyContent="space-around" alignItems="center">
          <label>Time: {hour}:00</label>
          {bookedHours.includes(hour) ? (
            <button className="table-reservation__button table-reservation__button--booked" onClick={() => console.log(`reserve table${id} at ${hour}:00`)} disabled>
              booked
            </button>
          ) : (
            <ReservationFormDialog tableId={id} hour={hour} dateReservation={date} />
          )}
        </Box>
      ))}
    </div>
  );
};
