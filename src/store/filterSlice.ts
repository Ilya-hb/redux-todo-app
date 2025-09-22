import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Filters } from "../types/enums";

const filterSlice = createSlice({
  name: "filter",
  initialState: Filters.ALL,
  reducers: {
    setFilter(state, action: PayloadAction<Filters>) {
      if (Object.values(Filters).includes(action.payload)) {
        return action.payload;
      } else return state;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
