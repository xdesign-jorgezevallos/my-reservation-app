import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, InputLabel, MenuItem, FormControl, Select, Button, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ReservationState } from "../../interfaces/reservationType";

import { addReservation } from "../../store/reservationSlice";

import "./styles.scss";
import { RootState } from "../../store";

interface IReservationFormDialog {
  tableId: number;
  hour: number;
  dateReservation?: Date;
}

const initialDataForm = {
  userUID: "",
  clientReservation: "",
  reservationAmount: 0,
  status: false,
  reservationDate: new Date(),
  table: 1,
  hour: -1,
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ReservationFormDialog: React.FC<IReservationFormDialog> = (props: IReservationFormDialog) => {
  const { tableId, hour, dateReservation } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { reservationExist, savedReservation } = useSelector((state: RootState) => state.reservations);
  const [bookData, setBookData] = useState<ReservationState>({
    ...initialDataForm,
    userUID: user.userUID,
    userEmail: user.email,
    clientReservation: user.displayName || "",
    table: tableId,
    hour,
    reservationDate: dateReservation,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReservation = async () => {
    if (bookData.clientReservation.trim() === "" && !bookData.status) {
      alert("Please insert Fullname name");
      return;
    }
    bookData.status = true;
    dispatch(addReservation(bookData) as any);
  };

  const handleForm = (event: any) => {
    setBookData({
      ...bookData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (reservationExist.status) {
      alert(reservationExist.message);
    }
    if (savedReservation) {
      handleClose();
    }
  }, [reservationExist, savedReservation]);

  return (
    <div>
      <Button variant="outlined" centerRipple className="reservation-form-dialog__btn reservation-form-dialog__btn--book" onClick={handleClickOpen}>
        book now!
      </Button>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Reservation Table{tableId} </DialogTitle>
        <DialogContent>
          <Stack spacing={2} style={{ paddingLeft: "10%", paddingRight: "10%" }}>
            <TextField id="clientReservation" name="clientReservation" label="Name" variant="outlined" onChange={handleForm} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Reservation Date"
                value={bookData?.reservationDate || new Date()}
                onChange={(newValue) => {
                  setBookData({ ...bookData });
                }}
                renderInput={(params) => <TextField {...params} />}
                disabled
              />
            </LocalizationProvider>
            <TextField label="Reseve table" variant="outlined" disabled defaultValue={`Table ${bookData.table}`} />
            <FormControl fullWidth>
              <InputLabel id="hour-select-label">Hour</InputLabel>
              <Select labelId="hour-select-label" name="hour" label="Hour" value={bookData.hour} onChange={handleForm} disabled>
                <MenuItem value={-1}>Select time</MenuItem>
                <MenuItem value={12}>12:00</MenuItem>
                <MenuItem value={13}>13:00</MenuItem>
                <MenuItem value={14}>14:00</MenuItem>
                <MenuItem value={15}>15:00</MenuItem>
                <MenuItem value={16}>16:00</MenuItem>
                <MenuItem value={17}>17:00</MenuItem>
                <MenuItem value={18}>18:00</MenuItem>
                <MenuItem value={19}>19:00</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleReservation}>
              Book now
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};
