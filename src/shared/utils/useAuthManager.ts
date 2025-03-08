import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import UserApi from "@api/user.api";
import { refreshTokenSuccess, logout } from "@redux/slices/userSlice";
import { clearCart } from "@redux/slices/cartSlice";
import { clearMessages } from "@redux/slices/botSlice";

const useAuthManager = () => {
    const userInfo = useSelector((state: any) => state.user_store?.userInfo);
    const dispatch = useDispatch();
    const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!userInfo) return;

        const { access_token, refresh_token } = userInfo.token;
        const expiresAt = new Date(access_token.expires_at).getTime();
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;

        console.log(`Token expires in ${timeUntilExpiry / 1000} seconds`);

        const accessTokenTime = timeUntilExpiry - 30000;
        refreshTimeoutRef.current = setTimeout(async () => {
            try {
                console.log("Refreshing token...");
                const data = await new UserApi().refreshToken(refresh_token.token);
                dispatch(refreshTokenSuccess({ access_token: data.data.access_token }));
                console.log("Token refreshed successfully!");
            } catch (error) {
                console.log("Failed to refresh token, logging out...");
                dispatch(logout());
                dispatch(clearCart())
                dispatch(clearMessages())
                toast.error("User token expires! You need to login again")
            }
        }, accessTokenTime);

        return () => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
        };
    }, [userInfo, dispatch]);

    return { access_token: userInfo?.token.access_token.token };
};

export default useAuthManager;
