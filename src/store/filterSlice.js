import { createSlice } from "@reduxjs/toolkit";
import { FILTERS } from "../utils/enums";

const filterSlice = createSlice({
  name: "filter",
  initialState: FILTERS.ALL,
  reducers: {
    setFilter(state, action) {
      if (Object.values(FILTERS).includes(action.payload)) {
        return action.payload;
      } else return state;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
