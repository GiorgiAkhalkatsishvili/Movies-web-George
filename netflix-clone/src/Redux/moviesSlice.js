import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  addedMovies: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setAddedMovies(state, action) {
      const exists = state.addedMovies.some(item => item.id === action.payload.id);
      if (!exists) {
        state.addedMovies.push({ ...action.payload });
      }
    },
  },
});

export const { setAddedMovies } = movieSlice.actions;

export default movieSlice.reducer;
