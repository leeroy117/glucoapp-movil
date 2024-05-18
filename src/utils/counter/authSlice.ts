import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Auth {
    access_token: string | null;
    isSignOut: boolean;
    isLoading: boolean;
  }
  
  const initialState: Auth = {
    access_token: null,
    isLoading: false,
    isSignOut: false,
  }

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
        signIn: (state, payload: PayloadAction<string | null>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.access_token = payload.payload
            state.isLoading = true;
            state.isSignOut = false;
        },
        signOut: (state) => {
            state.isSignOut = true;
            state.isLoading = false;
            state.access_token = null;
        }
    },
});

export const { 
    signIn, 
    signOut 
} = authSlice.actions

export default authSlice.reducer
