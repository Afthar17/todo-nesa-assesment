import Todo from "../models/todoModel.js";

export const getTodos = async (req, res) => {
  try {
    const userId = req.user._id;
    const todos = await Todo.find({ user: userId });
    if (!todos) {
      return res.status(400).json({ message: "No todos found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.error(error);
  }
};
export const addTodo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description } = req.body;
    const todo = await Todo.create({ user: userId, title, description });
    if (!todo) {
      return res.status(400).json({ message: "Failed to create todo" });
    }
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.error(error);
  }
};
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, description, status },
      { new: true }
    );

    if (!todo) {
      return res.status(400).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.error(error);
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findOneAndDelete({ _id: id, user: req.user._id });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.error(error);
  }
};
