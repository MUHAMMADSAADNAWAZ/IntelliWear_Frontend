import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user_slice",
    initialState:{
        userInfo: null,
    },
    reducers:{
        login: (state , action) =>{
            state.userInfo = action.payload;
        },
        logout: (state) =>{
            state.userInfo = null;
        }
    }
})

export const {login , logout} = userSlice.actions;
export const selectUser = (state: any) => state.user_store?.userInfo;
export default userSlice.reducer;