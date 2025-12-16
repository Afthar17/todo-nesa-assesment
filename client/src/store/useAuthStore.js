import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isCheckingAuth: false,

  signUp: async (data) => {
    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      set({ loading: true });

      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      set({ user: response.data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  login: async ({ email, password }) => {
    try {
      set({ loading: true });

      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      set({ user: response.data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });

      const response = await axios.get("/auth/checkAuth");

      set({
        user: response.data,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },

  logOut: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
}));
