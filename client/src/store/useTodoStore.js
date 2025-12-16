import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,
  meta: {
    page: 1,
    totalPages: 1,
  },

  getTodos: async ({ page = 1, limit = 6 } = {}) => {
    try {
      set({ loading: true });

      const res = await axios.get("/todos", {
        params: { page, limit },
      });

      set({
        todos: res.data.data,
        meta: res.data.meta,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to load todos");
    }
  },

  createTodo: async (data) => {
    try {
      const res = await axios.post("/todos", data);
      get().getTodos({ page: get().meta.page, limit: 6 });
      toast.success("Todo added");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add todo");
    }
  },

  updateTodo: async (id, data) => {
    try {
      const res = await axios.put(`/todos/${id}`, data);
      set({
        todos: get().todos.map((todo) => (todo._id === id ? res.data : todo)),
      });
      toast.success("Todo updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update todo");
    }
  },

  deleteTodo: async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      get().getTodos({ page: get().meta.page, limit: 6 });
      toast.success("Todo deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete todo");
    }
  },
}));
