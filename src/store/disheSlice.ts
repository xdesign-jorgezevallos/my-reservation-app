import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Dish, DishState } from "../interfaces/dishType";

const initialState: Dish = {
  dishes: [],
};

export const dishesReducer = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    addDish: (state, action: PayloadAction<DishState>) => {
      state.dishes.push(action.payload);
    },
    removeDish: (state, action) => {
      state.dishes.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDish, removeDish } = dishesReducer.actions;

export default dishesReducer.reducer;
