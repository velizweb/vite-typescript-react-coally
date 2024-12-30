import { useDraggable } from "@dnd-kit/core";
import { Task } from "../types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAppContext } from "../hooks/useAppContext";
import { removeTask } from "../api";
import { useAuth } from "../context/AuthContext";

type TaskCardProps = {
  task: Task;
  handleUpdate: () => void;
};

export function TaskCard({ task, handleUpdate }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id || 0,
  });
  const { handleRemoveTask } = useAppContext();
  const { token } = useAuth();

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const handleRemove = (task: string) => {
    removeTask(task, token as string)
      .then(() => {
        handleRemoveTask(task);
      })
      .catch((error) => {
        console.error("Failed to remove Task:", error);
      });
  };

  const convertDate = (date: any) => {
    const dateNew = new Date(Date.parse(date));
    return dateNew.toLocaleString("us-US", { timeZone: "UTC" });
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="text-sm text-blue-100">{convertDate(task.createdAt)}</p>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>

      <div className="flex justify-between w-full mt-5">
        <button type="button"
          className="bg-yellow-500 text-white p-2 rounded-md"
          onClick={handleUpdate}
        >
          <FaEdit />
        </button>
        <button type="button"
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => handleRemove(task._id as string)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
