import React, { useEffect, useState } from 'react';
import {
  Typography,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { modifyReservation, unselectedReservation } from '../../store/reservationSlice';
import { Stack } from '@mui/system';
import { ReservationUpdated } from '../../interfaces/reservationType';

interface IReservationUpdate {
  clientReservation: string;
  hour: number;
}

export const UpdateReservationDialog = () => {
  const dispatch = useDispatch();
  const { showUpdateReservationDialog, selectedReservation } = useSelector((state: RootState) => state.reservations);
  const [open, setOpen] = React.useState(false);
  const [updatedReservation, setUpdatedReservation] = useState<IReservationUpdate>({
    clientReservation: selectedReservation?.clientReservation || '',
    hour: selectedReservation?.hour || -1,
  });

  const handleClose = () => {
    dispatch(unselectedReservation(undefined) as any);
    setOpen(false);
  };

  const handleTxtField = (event: any) => {
    event.preventDefault();

    setUpdatedReservation({
      ...updatedReservation,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateReservation = () => {
    console.log('UPDATED: ', updatedReservation);
    const data = {
      reservationUID: selectedReservation?.id as string,
      reservationData: { ...selectedReservation, ...updatedReservation } as ReservationUpdated,
    };
    dispatch(modifyReservation(data) as any);
    handleClose();
  };

  useEffect(() => {
    setOpen(showUpdateReservationDialog);
    if (selectedReservation) {
      setUpdatedReservation({
        clientReservation: selectedReservation?.clientReservation,
        hour: selectedReservation?.hour,
      });
    }
  }, [showUpdateReservationDialog]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Reservation Table{selectedReservation?.table} </DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={1.5} padding={3}>
          <TextField
            name="clientReservation"
            label="Client reservation"
            // value={selectedReservation?.clientReservation}
            defaultValue={selectedReservation?.clientReservation}
            onChange={handleTxtField}
          />
          <FormControl fullWidth>
            <InputLabel id="hour-select-label">Hour</InputLabel>
            <Select
              labelId="hour-select-label"
              name="hour"
              label="Hour"
              // value={selectedReservation?.hour}
              defaultValue={selectedReservation?.hour}
              onChange={handleTxtField}
            >
              <MenuItem value={`-1`}>Select time</MenuItem>
              <MenuItem value={`12`}>12:00</MenuItem>
              <MenuItem value={`13`}>13:00</MenuItem>
              <MenuItem value={`14`}>14:00</MenuItem>
              <MenuItem value={`15`}>15:00</MenuItem>
              <MenuItem value={`16`}>16:00</MenuItem>
              <MenuItem value={`17`}>17:00</MenuItem>
              <MenuItem value={`18`}>18:00</MenuItem>
              <MenuItem value={`19`}>19:00</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="status"
            label="Status"
            value={selectedReservation?.status ? 'Confirmed' : 'Pending'}
            disabled
          />
          <TextField
            name="amount"
            label="Payment reservation"
            value={selectedReservation?.reservationAmount}
            disabled
          />
        </Stack>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdateReservation}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};
