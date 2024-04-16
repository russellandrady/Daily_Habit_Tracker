import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;//payload may contain the user data. After successful login you can see in the redux on the browser, how payload is looks like. 
            state.loading = false;
            state.error = false;

        },
        signInFailure: (state,action) => {
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
            state.loading = false;
            state.error = false;

        },
    }
});
export const {signInStart, signInSuccess, signInFailure, signInAlert, updateUserStart, updateUserSuccess, updateUserFailure, updateAlert, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOut} = userSlice.actions;
export default userSlice.reducer;