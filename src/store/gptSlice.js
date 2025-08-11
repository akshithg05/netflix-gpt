import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: null,
    tmdbResults: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addSearchedMovies: (state, action) => {
      const { gptMovies, tmdbResults } = action.payload;
      state.tmdbResults = tmdbResults;
      state.gptMovies = gptMovies;
    },
  },
});

export const { toggleGptSearchView, addSearchedMovies } = gptSlice.actions;
export default gptSlice.reducer;
