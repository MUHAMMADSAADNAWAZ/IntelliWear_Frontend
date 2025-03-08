import { AuthResponse } from "@dto/myprofile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        },
        refreshTokenSuccess: (
            state,
            action: PayloadAction<{ access_token: AuthResponse["token"]["access_token"] }>
        ) => {
            if (state.userInfo) {
                state.userInfo.token.access_token = action.payload.access_token;
                state.userInfo.token.access_token.expires_at = action.payload.access_token.expires_at;
            }
        },
        
    }
})

export const {login , logout , update , refreshTokenSuccess} = userSlice.actions;
export const selectUser = (state: any) => state.user_store?.userInfo;
export default userSlice.reducer;