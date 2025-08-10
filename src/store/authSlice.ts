import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

const serializeUser = (user: User | null) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

export interface AuthState {
  user: ReturnType<typeof serializeUser>;
  initializing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  initializing: true,
  error: null,
};

// Login with email/password
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return serializeUser(userCredential.user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const listenToAuth = createAsyncThunk(
  "auth/listenToAuth",
  async (_, { dispatch }) => {
    return new Promise<ReturnType<typeof serializeUser>>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        const serialized = serializeUser(user);
        resolve(serialized);
      });
    });
  }
);

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthState["user"]>) => {
          state.user = action.payload;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Auth listener
      .addCase(
        listenToAuth.fulfilled,
        (state, action: PayloadAction<AuthState["user"]>) => {
          state.user = action.payload;
          state.initializing = false;
        }
      )

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
