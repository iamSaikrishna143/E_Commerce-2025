import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: localStorage.getItem("role") || "",
    user: JSON.parse(localStorage.getItem("user")) || "",
    isAuthenticated: !!localStorage.getItem("token") || null,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.role = action.payload.user.role;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role);
    },
    setUserLogout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    },
  },
});

export const { setUserLogin, setUserLogout } = authSlice.actions;
export default authSlice.reducer;
