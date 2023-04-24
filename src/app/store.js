import { configureStore } from '@reduxjs/toolkit'
import noteReducer from '../features/note/noteSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer
  },
});