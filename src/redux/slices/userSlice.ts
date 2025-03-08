import { AuthResponse } from "@dto/myprofile.dto";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user_slice",
    initialState:{
        userInfo: null as AuthResponse | null,
    },
    reducers:{
        login: (state , action) =>{
            state.userInfo = action.payload;
        },
        logout: (state) =>{
            state.userInfo = null;
        },
        update: (state, action) => {
            if (state.userInfo) {
                state.userInfo.user_info = action.payload;
            }
        }
    }
})

export const {login , logout , update} = userSlice.actions;
export const selectUser = (state: any) => state.user_store?.userInfo;
export default userSlice.reducer;