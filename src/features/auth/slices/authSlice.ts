// src/features/auth/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, fetchUserApi, logoutApi} from "../services/authService";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await fetchUserApi();
      return response.data; // user data
    } catch (error) {
      return thunkAPI.rejectWithValue("No autenticado");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }, thunkAPI) => {
    try {
      await loginApi(data);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al iniciar sesión");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutApi();
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error al cerrar sesión");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as null | { id: string; email: string },
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
