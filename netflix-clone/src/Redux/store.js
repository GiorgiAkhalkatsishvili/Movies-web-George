import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './moviesSlice';

const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default store;
