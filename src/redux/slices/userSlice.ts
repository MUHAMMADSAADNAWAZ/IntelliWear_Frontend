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
        // update: (state, action) => {
        //    const {user_info , token } = action.payload
        //    if (state.userInfo) {
        //        state.userInfo.user_info = user_info;
        //        state.userInfo.token = token;
        //    }
        // }
        update: (state, action) => {
            if (!state.userInfo) return; // Ensure userInfo exists
        
            const { user_info, token } = action.payload;
        
            // Merge token updates while keeping existing values
            if (token) {
                state.userInfo.token = {
                    ...state.userInfo.token, // Keep existing token values
                    ...token, // Override only received values
                };
            }
        
            // Merge user_info updates while keeping existing values
            if (user_info) {
                state.userInfo.user_info = {
                    ...state.userInfo.user_info, // Keep existing user_info values
                    ...user_info, // Override only received values
                };
            }
        }
        
    }
})

export const {login , logout , update} = userSlice.actions;
export const selectUser = (state: any) => state.user_store?.userInfo;
export default userSlice.reducer;
