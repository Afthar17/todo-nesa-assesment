import Todo from "../models/todoModel.js";

export const getTodos = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 6, 50);
    const skip = (page - 1) * limit;

    const [todos, total] = await Promise.all([
      Todo.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Todo.countDocuments({ user: userId }),
    ]);

    res.status(200).json({
      data: todos,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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
