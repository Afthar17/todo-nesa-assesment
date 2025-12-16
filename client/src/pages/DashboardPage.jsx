import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import TodoCard from "../components/TodoCard";
import TodoFormOverlay from "../components/TodoFormOverlay";
import { useTodoStore } from "../store/useTodoStore";

const DashBoardPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [page, setPage] = useState(1);

  const { todos, loading, getTodos, createTodo, updateTodo, deleteTodo, meta } =
    useTodoStore();

  useEffect(() => {
    getTodos({ page, limit: 6 });
  }, [getTodos, page]);

  const handleSubmit = async (formValues) => {
    if (selectedTodo) {
      await updateTodo(selectedTodo._id, formValues);
    } else {
      await createTodo(formValues);
    }

    setIsFormOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div className="flex-1 mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Tasks</h1>
            <p className="text-sm text-slate-500">Manage your TODO's</p>
          </div>

          <button
            onClick={() => {
              setSelectedTodo(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 
                       text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusIcon size={18} />
            Add Task
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-center text-slate-600">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-slate-500">No tasks yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onClick={() => {
                  setSelectedTodo(todo);
                  setIsFormOpen(true);
                }}
                onDelete={() => deleteTodo(todo._id)}
              />
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <TodoFormOverlay
          todo={selectedTodo}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedTodo(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
      {meta.totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-full border px-4 py-1.5 text-sm disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-slate-600 flex items-center">
            Page {meta.page} of {meta.totalPages}
          </span>

          <button
            disabled={page === meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border px-4 py-1.5 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DashBoardPage;
