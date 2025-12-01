import { configureStore, createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interaction",
  initialState: { interactions: [] },
  reducers: {
    setInteractions: (state, action) => {
      state.interactions = action.payload;
    }
  }
});

export const { setInteractions } = interactionSlice.actions;

export const store = configureStore({
  reducer: { interaction: interactionSlice.reducer }
});
