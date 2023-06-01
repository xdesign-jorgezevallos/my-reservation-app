import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getDateReservations,
  saveReservation,
  findReservation,
  getDateReservationsByUser,
  deleteReservation,
  updateReservation,
  getAllReservations,
} from '../firestore/services/reservation';
import { Reservation, ReservationResponse, ReservationState, ReservationUpdated } from '../interfaces/reservationType';

const initialState: Reservation = {
  reservations: [],
  reservationExist: { status: false, message: '' },
  savedReservation: false,
  selectedReservation: undefined,
  showUpdateReservationDialog: false,
};

// Thunks
export const fetchReservations = createAsyncThunk('reservations/fetchReservationsByDate', async (date: Date) => {
  const response = await getDateReservations(date);
  return response;
});

export const fetchAllReservations = createAsyncThunk('reservations/fetchAllReservations', async () => {
  const response = await getAllReservations();
  return response;
});

export const fetchUserReservations = createAsyncThunk(
  'reservations/fetchUserReservationsByDate',
  async (data: { date: Date; uid: string }) => {
    console.log('thunk: ', data.date);
    const response = await getDateReservationsByUser(data.date, data.uid);
    return response;
  }
);

export const addReservation = createAsyncThunk(
  'reservations/addReservation',
  async (reservationData: ReservationState, { rejectWithValue }) => {
    try {
      const { reservationDate, table, hour } = reservationData;
      const exist = await findReservation(reservationDate as Date, table, hour);
      if (exist) {
        return rejectWithValue({ status: true, message: 'Booked table' });
      }

      const response = saveReservation(reservationData);
      return response;
    } catch (error) {
      console.log('Error: ', error);
    }
  }
);

export const modifyReservation = createAsyncThunk(
  'reservations/modifyReservation',
  async (data: { reservationUID: string; reservationData: ReservationUpdated }, { rejectWithValue }) => {
    try {
      const { reservationUID, reservationData } = data;
      const response = await updateReservation(reservationUID, reservationData);
      return response;
    } catch (error) {
      console.log('Error: ', error);
    }
  }
);

export const cancelReservation = createAsyncThunk(
  'reservations/cancelReservation',
  async (data: { reservationUID: string; reservationData: ReservationState }, { rejectWithValue }) => {
    try {
      const { reservationUID, reservationData } = data;
      const response = await deleteReservation(reservationUID, reservationData);
      return response;
    } catch (error) {
      console.log('Error: ', error);
    }
  }
);

// Reducers
export const reservationsReducer = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    createReservation: (state, action: PayloadAction<ReservationState>) => {
      state.reservations.push(action.payload);
    },
    selectedReservation: (state, action) => {
      state.selectedReservation = action.payload;
      state.showUpdateReservationDialog = true;
    },
    unselectedReservation: (state, action) => {
      state.selectedReservation = undefined;
      state.showUpdateReservationDialog = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.reservations = [...action.payload];
      })
      .addCase(addReservation.pending, (state, action) => {
        state.savedReservation = false;
        state.reservationExist = initialState.reservationExist;
      })
      .addCase(addReservation.rejected, (state, action) => {
        state.reservationExist = action.payload as ReservationResponse;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        if (action.payload) {
          state.reservations.push(action.payload as any);
          state.savedReservation = true;
        }
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        console.log('addcase: ', action.payload);
        state.reservations = action.payload;
      })
      .addCase(modifyReservation.fulfilled, (state, action) => {
        const reservations = state.reservations;
        const reservationUpdated: ReservationState | undefined | null = action.payload;

        if (reservationUpdated && reservationUpdated.id) {
          const index = reservations.findIndex((rs) => rs.id === reservationUpdated.id);
          reservations.splice(index, 1, reservationUpdated);
        }
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter((reservation) => reservation.id !== action?.payload?.id);
      })
      .addCase(fetchAllReservations.fulfilled, (state, action) => {
        state.reservations = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { createReservation, selectedReservation, unselectedReservation } = reservationsReducer.actions;

export default reservationsReducer.reducer;
