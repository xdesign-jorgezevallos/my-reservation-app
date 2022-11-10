import * as React from 'react';
import { Typography, DialogContent, DialogTitle,Dialog } from '@mui/material';

export const ModifyReservatioDialog = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Update Reservation</DialogTitle>
            <DialogContent>

            </DialogContent>
        </Dialog>
    );
}