import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../../types';
import { fetchCart } from './cartSlice';
import { AppDispatch } from '../store';

interface UserState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

interface LoginResponse {
  user: User;
  token: string;
}

export const loginUser = createAsyncThunk<LoginResponse, { email: string; password: string }, { dispatch: AppDispatch }>(
  'user/loginUser',
  async (credentials, { dispatch }) => {
    const response = await axios.post<LoginResponse>('http://localhost:3000/users/login', credentials);
    dispatch(fetchCart());
    return response.data;
  }
);

export const registerUser = createAsyncThunk<LoginResponse, { username: string; email: string; password: string }, { dispatch: AppDispatch }>(
  'user/registerUser',
  async (userData, { dispatch }) => {
    const response = await axios.post<LoginResponse>('http://localhost:3000/users/createUser', userData);
    dispatch(fetchCart());
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = 'succeeded';
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to register';
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
