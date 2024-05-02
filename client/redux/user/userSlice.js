import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  habits: [],
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; //payload may contain the user data. After successful login you can see in the redux on the browser, how payload is looks like.
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signInAlert: (state) => {
      state.loading = false;
      state.error = false;
    },
    updateUserStart(state) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateAlert: (state) => {
      state.loading = false;
      state.error = false;
    },
    deleteUserStart(state) {
      state.loading = true;
    },
    deleteUserSuccess(state) {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    signOut(state) {
      state.currentUser = null;
      state.habits = [];
      state.loading = false;
      state.error = false;
    },
    habitGotAll(state, action) {
      state.habits = action.payload;
    },
    habitGotAllFailure(state, action) {
      state.error = action.payload;
    },
    habitSubmitStart(state) {
      state.loading = true;
      state.error = false;
    },
    habitSubmitSuccess(state) {
      state.loading = false;
    },
    habitSubmitFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    habitSubmitUpdateStart(state) {
      state.loading = true;
      state.error = false;
    },
    habitSubmitUpdateSuccess(state) {
      state.loading = false;
      state.error = false;
    },
    habitSubmitUpdateFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    habitDeleteStart(state, action) {
      state.loading = true;
      state.error = false;
    },
    habitDeleteSuccess(state, action) {
      state.loading = false;
      state.error = false;
    },
    habitDeleteFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    habitResetStart(state) {
      state.loading = true;
      state.error = false;
    },
    habitResetSuccess(state) {
      state.loading = false;
      state.error = false;
    },
    habitResetFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    contactStart(state) {
      state.loading = true;
      state.error = false;
    },
    contactSuccess(state) {
      state.loading = false;
      state.error = false;
    },
    contactFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signInAlert,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updateAlert,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
  habitGotAll,
  habitGotAllFailure,
  habitSubmitStart,
  habitSubmitSuccess,
  habitSubmitFailure,
  habitSubmitUpdateStart,
  habitSubmitUpdateSuccess,
  habitSubmitUpdateFailure,
  habitDeleteStart,
  habitDeleteSuccess,
  habitDeleteFailure,
  habitResetStart,
  habitResetSuccess,
  habitResetFailure,
  contactStart,
  contactSuccess,
  contactFailure,
} = userSlice.actions;
export default userSlice.reducer;
