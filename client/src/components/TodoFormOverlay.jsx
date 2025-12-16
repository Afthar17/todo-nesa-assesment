import { useEffect, useState } from "react";
import { X } from "lucide-react";

const TodoFormOverlay = ({ todo, onClose, onSubmit }) => {
  const isEdit = !!todo;

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (todo) {
      setFormValues({
        title: todo.title || "",
        description: todo.description || "",
        status: todo.status || "pending",
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.title.trim()) return;
    onSubmit(formValues);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">
            {isEdit ? "Edit Todo" : "Create Todo"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Title
            </label>
            <input
              name="title"
              value={formValues.title}
              onChange={handleChange}
              autoFocus
              className="w-full rounded-xl border border-slate-200 bg-slate-50 
                         px-3 py-2.5 text-sm 
                         focus:ring-2 focus:ring-blue-500/40 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formValues.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 
                         px-3 py-2.5 text-sm 
                         focus:ring-2 focus:ring-blue-500/40 outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Status
            </label>
            <select
              name="status"
              value={formValues.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white 
                         px-3 py-2.5 text-sm 
                         focus:ring-2 focus:ring-blue-500/40 outline-none"
            >
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm 
                         font-medium text-white hover:bg-blue-700"
            >
              {isEdit ? "Update Todo" : "Create Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoFormOverlay;
