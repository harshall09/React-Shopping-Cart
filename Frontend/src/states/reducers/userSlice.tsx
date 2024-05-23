import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../../src/axiosConfig'; // Import axios instance with interceptor
import { User } from '../../../types';
import { fetchCart } from './cartSlice';
import { AppDispatch, RootState } from '../store';

interface UserState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token'), // Retrieve token from localStorage
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
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/users/login', credentials);
      const { user, token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      dispatch(fetchCart());
      return response.data;
    } catch (error) {
      // Handle error
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk<LoginResponse, { username: string; email: string; password: string }, { dispatch: AppDispatch }>(
  'user/registerUser',
  async (userData, { dispatch }) => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/users/createUser', userData);
      const { user, token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      dispatch(fetchCart());
      return response.data;
    } catch (error) {
      // Handle error
      throw error;
    }
  }
);

export const fetchUser = createAsyncThunk<User, void, { state: RootState }>(
  'user/fetchUser',
  async (_, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get<User>('http://localhost:3000/users/userCart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    } else {
      throw new Error('No token found');
    }
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
      localStorage.removeItem('token'); // Remove token from localStorage
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
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user';
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
