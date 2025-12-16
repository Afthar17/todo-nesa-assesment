import { Trash2 } from "lucide-react";

const statusStyles = {
  pending: "bg-slate-100 text-slate-700",
  inProgress: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const TodoCard = ({ todo, onClick, onDelete }) => {
  return (
    <article
      onClick={onClick}
      className="group relative flex flex-col rounded-2xl border 
                 border-slate-200 bg-white p-5 shadow-sm 
                 hover:border-blue-300 hover:shadow-md 
                 transition cursor-pointer"
    >
      {/* Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute right-3 top-3 rounded-full p-1.5 
                   text-slate-400 hover:bg-red-50 hover:text-red-600 
                   opacity-0 group-hover:opacity-100 transition"
      >
        <Trash2 size={16} />
      </button>

      {/* Header */}
      <div className="mb-2 flex items-start justify-between pr-6">
        <h3 className="text-sm font-semibold text-slate-900 leading-snug">
          {todo.title}
        </h3>

        <span
          className={`ml-2 shrink-0 rounded-full px-2.5 py-0.5 
                      text-[11px] font-medium 
                      ${statusStyles[todo.status]}`}
        >
          {todo.status.replace("_", " ")}
        </span>
      </div>

      {/* Description */}
      {todo.description && (
        <p className="text-xs text-slate-600 line-clamp-3">
          {todo.description}
        </p>
      )}
    </article>
  );
};

export default TodoCard;
