import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // check current user authentication
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check-auth");
      set({ authUser: response.data.user });
    } catch (error) {
      set({ authUser: null });
      console.error("🚀 ~ checkAuth: ~ error:", error.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // sign up new user
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: response.data.user });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // login user
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      toast.success("Login successfully");
      set({ authUser: response.data.user });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // logout user
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logout successfully");
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // update user profile picture
  updateProfile: async (data) => {
    console.log("🚀 ~ updateProfile: ~ data:", data);
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      console.log("🚀 ~ updateProfile: ~ response:", response);
      toast.success("Profile updated successfully");
      set({ authUser: response.data.user });
    } catch (error) {
      console.log("🚀 ~ updateProfile: ~ error:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

export default useAuthStore;
