import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,

  getTodos: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/todos");
      set({ todos: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to load todos");
    }
  },

  createTodo: async (data) => {
    try {
      const res = await axios.post("/todos", data);
      set({ todos: [...get().todos, res.data] });
      toast.success("Todo added");
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
      set({
        todos: get().todos.filter((todo) => todo._id !== id),
      });
      toast.success("Todo deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete todo");
    }
  },
}));
