import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { getDateReservations, saveReservation, findReservation, getDateReservationsByUser } from "../firestore/services/reservation";
import { Reservation, ReservationResponse, ReservationState } from "../interfaces/reservationType";

const initialState: Reservation = {
  reservations: [],
  reservationExist: { status: false, message: "" },
  savedReservation: false,
};

// Thunks
export const fetchReservations = createAsyncThunk("reservations/fetchReservationsByDate", async (date: Date) => {
  const response = await getDateReservations(date);
  return response;
});

export const fetchUserReservations = createAsyncThunk("reservations/fetchUserReservationsByDate", async (data: { date: Date; uid: string }) => {
  const response = await getDateReservationsByUser(data.date, data.uid);
  return response;
});

export const addResrvation = createAsyncThunk("reservations/addReservation", async (reservationData: ReservationState, { rejectWithValue }) => {
  try {
    const { reservationDate, table, hour } = reservationData;
    const exist = await findReservation(reservationDate as Date, table, hour);
    if (exist) {
      return rejectWithValue({ status: true, message: "Booked table" });
    }

    const response = saveReservation(reservationData);
    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
});

// Reducers
export const reservationsReducer = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    createReservation: (state, action: PayloadAction<ReservationState>) => {
      state.reservations.push(action.payload);
    },
    updateReservation: (state, action) => {
      state.reservations.splice(action.payload, 1);
    },
    removeReservation: (state, action) => {
      state.reservations.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.reservations = [...action.payload];
      })
      .addCase(addResrvation.pending, (state, action) => {
        state.savedReservation = false;
        state.reservationExist = initialState.reservationExist;
      })
      .addCase(addResrvation.rejected, (state, action) => {
        state.reservationExist = action.payload as ReservationResponse;
      })
      .addCase(addResrvation.fulfilled, (state, action) => {
        if (action.payload) {
          state.reservations.push(action.payload);
          state.savedReservation = true;
        }
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.reservations = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { createReservation, updateReservation, removeReservation } = reservationsReducer.actions;

export default reservationsReducer.reducer;
