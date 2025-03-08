import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserApi from "@api/user.api";
import { clearMessages } from "@redux/slices/botSlice";
import { logout, selectUser, update } from "@redux/slices/userSlice";
import { clearCart } from "@redux/slices/cartSlice";
import { ROUTE_HOME } from "@routes/constants";

export function useTokenRefresh() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userapi = new UserApi();
  const refreshTimeoutRef = useRef<number | null>(null);


  const [lastRefreshed, setLastRefreshed] = useState(Date.now()); // Track last refresh timestamp

  useEffect(() => {
    function scheduleTokenRefresh() {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
  
      const accessToken = user?.token?.access_token?.token;
      const accessExpiresAt = user?.token?.access_token?.expires_at;
  
      if (!accessToken || !accessExpiresAt) {
        console.log("No access token found, stopping refresh.");
        return;
      }
  
      const expiresAt = new Date(accessExpiresAt).getTime();
      const now = new Date().getTime();
      const timeUntilExpiry = expiresAt - now;
  
      console.log(`Access token expires in: ${timeUntilExpiry / 1000} seconds`);
  
      if (timeUntilExpiry > 30000) {
        refreshTimeoutRef.current = setTimeout(refreshAccessToken, timeUntilExpiry - 30000);
      } else {
        refreshAccessToken();
      }
    }
  
    async function refreshAccessToken() {
      const refreshToken = user?.token?.refresh_token?.token;
  
      if (!refreshToken) {
        console.log("No refresh token found, logging out...");
        logoutUser();
        return;
      }
  
      try {
        console.log("Before request, user is", user);
        const response = await userapi.refreshToken(refreshToken);
        dispatch(update(response?.data));
        setLastRefreshed(Date.now()); // ✅ Prevents infinite re-renders
        console.log("API response is", response?.data);
      } catch (error) {
        console.log("Refresh token expired, logging out...");
        logoutUser();
      }
    }
  
    scheduleTokenRefresh();
  
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, [lastRefreshed]); // ✅ Only re-run when token is explicitly refreshed

  useEffect(()=>{
    console.log("updtaed user state is" , user)
  },[user])
  
  
  function logoutUser() {
    dispatch(logout());
    dispatch(clearMessages());
    dispatch(clearCart());
    navigate(ROUTE_HOME);
    toast.error("User Token Expired! You need to log in again.");
  }
  
}