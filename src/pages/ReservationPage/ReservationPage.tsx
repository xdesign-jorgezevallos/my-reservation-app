import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack, Typography, TextField } from "@mui/material";

import TemplateBase from "../../components/commons/TemplateBase/TemplateBase";
import { fetchReservations } from "../../store/reservationsSlice";
import { RootState } from "../../store";
import TableReservation from "../../components/TableReservation";

import "./styles.scss";

interface ITable {
  idTable: number;
  description?: string;
  bookedHours?: number[];
  seats?: number;
}

const tables = [
  {
    idTable: 1,
    description: "Front side and street view",
    seats: 4,
  },
  {
    idTable: 2,
    description: "interiror side and inside view",
    seats: 2,
  },
  {
    idTable: 3,
    description: "Front side and street view",
    seats: 8,
  },
  {
    idTable: 4,
    description: "interiror side and inside view",
    seats: 6,
  },
];

const formatAvailableTablesData = (tables: ITable[], reservations: any) => {
  const tableWithBookedHours = tables;
  tables.forEach((table) => {
    const list = reservations.filter((reservation: { table: number }) => reservation.table === table.idTable);
    const tableHours = list?.map((reservation: { hour: any }) => reservation.hour);
    table.bookedHours = tableHours;
  });
  return tableWithBookedHours;
};

export const ReservationPage: React.FC = () => {
  const dispatch = useDispatch();
  const [dateSelected, setDateSelected] = useState<Date>(new Date()); //"2022-10-5"
  const { reservations } = useSelector((state: RootState) => state.reservations);

  const handleDateSelector = (date: Date | null) => {
    setDateSelected(date as Date);
    dispatch(fetchReservations(date as Date) as any);
  };

  useEffect(() => {
    dispatch(fetchReservations(dateSelected) as any);
  }, [dateSelected, dispatch]);

  const data = formatAvailableTablesData(tables, reservations);

  return (
    <TemplateBase>
      <Stack direction="row" spacing={5} className="reservation-page__wrapper-filter">
        <Typography variant="h4" className="reservation-page__title">
          Make a reservation:
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker disablePast label="Reservation Date" value={dateSelected} onChange={handleDateSelector} renderInput={(params) => <TextField {...params} />} />
        </LocalizationProvider>
      </Stack>
      <div className="reservation-page__wrapper-tables">
        {data.map((table, index) => (
          <TableReservation key={index} id={table.idTable} date={dateSelected} bookedHours={table.bookedHours as number[]} seats={table.seats} />
        ))}
      </div>
    </TemplateBase>
  );
};
