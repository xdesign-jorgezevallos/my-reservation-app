import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dishesReducer from "./disheSlice";
import reservationsReducer from "./reservationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dishes: dishesReducer,
    reservations: reservationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
