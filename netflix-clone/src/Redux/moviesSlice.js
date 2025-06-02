import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movie',
  initialState: {
    addedMovies: JSON.parse(localStorage.getItem('addedMovies')) || [],
  },
  reducers: {
    setAddedMovies: (state, action) => {
      const exists = state.addedMovies.find(movie => movie.id === action.payload.id);
      if (!exists) {
        state.addedMovies.push(action.payload);
      }
    },
    removeMovie: (state, action) => {
      state.addedMovies = state.addedMovies.filter(movie => movie.id !== action.payload);
    },
    clearAddedMovies: (state) => {
      state.addedMovies = [];
    },
  }
});

export const { setAddedMovies, removeMovie, clearAddedMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
