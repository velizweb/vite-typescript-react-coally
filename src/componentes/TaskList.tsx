import TaskItem from "./TaskItem";
import { useAppContext } from "../hooks/useAppContext";
import { Task } from "../types";
import { useEffect, useState } from "react";

const TaskList = () => {
  const { task, handleSelectedTask } = useAppContext();
  const [tasks, setTasks] = useState<Task[]>(task);

  const handleUpdate = (task: Task) => handleSelectedTask(task);

  const filterTask = (filter: string) => {
    if (Number(filter) != 0) {
      const search = task.filter((task) =>
        Number(filter) == 1 ? task.state : !task.state
      );
      setTasks(search);
      return;
    }
    setTasks(task);
  };

  useEffect(() => {
    setTasks(task);
  }, [task]);

  return (
    <div className="mt-5 w-full">
      <div className="flex justify-between max-[375px]:flex-col max-[375px]:items-center ">
        <h3 className="font-bold">Lista de tareas</h3>
        <p className="flex items-center ">
          <h3 className="mx-2 font-bold">Filtrar:</h3>
          <select
            className="rounded-md w-40 p-1"
            onChange={(e) => filterTask(e.target.value)}
          >
            <option value="0" selected>
              Todas
            </option>
            <option value="1">Completadas</option>
            <option value="2">Pendientes</option>
          </select>
        </p>
      </div>
      <ul>
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task._id}
              task={task}
              handleUpdate={() => handleUpdate(task)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
