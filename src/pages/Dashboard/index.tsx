import { useAppContext } from "../../hooks/useAppContext";
import { fetchTask } from "../../api";
import { useEffect } from "react";
import { Task } from "../../types";
import TaskList from "../../componentes/TaskList";
import FormTask from "../../componentes/FormTask";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { handleSetTasks, taskTotal, taskPending, taskCompleted } = useAppContext();
  const { token } = useAuth();

  useEffect(() => {
    fetchTask(token as string)
      .then((data: Task[]) => {
        handleSetTasks(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Task:", error);
      });
  }, []);

  return (
    <div className="flex justify-center h-screen pt-11">
      <div className="w-[680px] border border-gray-300 p-5 rounded-md flex flex-col items-center">
        <h1 className="text-3xl text-gray-700 font-bold">Lista de tareas</h1>
        <div className="w-full flex justify-between items-center my-10 px-5 max-[375px]:flex-col">
          <h3 className="text-blue-700 font-bold">N° Tareas: {taskTotal}</h3>
          <h3 className="text-green-700 font-bold">Completadas: {taskCompleted}</h3>
          <h3 className="text-red-700 font-bold">Pendientes: {taskPending}</h3>
        </div>
        <FormTask />
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
