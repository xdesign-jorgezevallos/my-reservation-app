import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import dishesReducer from "./dishes";
import reservationsReducer from "./reservationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dishes: dishesReducer,
    reservations: reservationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
