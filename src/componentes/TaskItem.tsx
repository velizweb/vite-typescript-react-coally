import { FaEdit, FaTrash } from "react-icons/fa";
import { Task } from "../types";
import { useAppContext } from "../hooks/useAppContext";
import { removeTask, updateTask } from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

type Props = {
  task: Task;
  handleUpdate: () => void;
};

const TaskItem = ({ task, handleUpdate }: Props) => {
  const { handleRemoveTask, handleToggleTask } = useAppContext();
  const { token } = useAuth();

  const handleRemove = (task: string) => {
    removeTask(task, token as string)
      .then(() => {
        handleRemoveTask(task);
        toast.error("Tarea eliminada", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error("Failed to remove Task:", error);
      });
  };

  const convertDate = (date: any) => {
    const dateNew = new Date(Date.parse(date));
    return dateNew.toLocaleString("us-US", { timeZone: "UTC" });
  };

  const handleUpdateState = (
    e: React.ChangeEvent<HTMLInputElement>,
    task: Task
  ) => {
    const taskUpdate: Task = { ...task, state: e.target.checked };
    updateTask(taskUpdate, token as string)
      .then(() => {
        handleToggleTask(taskUpdate);
        toast.success("Estado de la tarea modificada", {
          position: "top-right",
        });
      })
      .catch((error) => console.error("Failed to updated Task:", error));
  };

  const className = `${!task.state ? 'bg-red-100' : 'bg-green-100'} flex justify-between items-center border border-gray-300 p-2 rounded-md mt-2`;
  return (
    <>
      <li
        key={task._id}
        className={className}
      >
        <input
          type="checkbox"
          className=""
          checked={task.state}
          onChange={(e) => handleUpdateState(e, task)}
        />
        <div className="grow ml-3 flex flex-col">
          <p className="font-bold text-slate-700 text-md">
            {task.title}{" "}
            <span className="text-sm text-blue-700">
              {convertDate(task.createdAt)}
            </span>
          </p>
          <p className="text-slate-500 text-sm">{task.description}</p>
        </div>
        <div className="flex justify-between w-20">
          <button
            className="bg-yellow-500 text-white p-2 rounded-md"
            onClick={handleUpdate}
          >
            <FaEdit />
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => handleRemove(task._id as string)}
          >
            <FaTrash />
          </button>
        </div>
      </li>
    </>
  );
};

export default TaskItem;
