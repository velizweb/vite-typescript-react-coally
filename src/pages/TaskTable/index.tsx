import { useEffect, useState } from "react";
import { Task, Column as ColumnType } from "../../types";
import { useAppContext } from "../../hooks/useAppContext";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Column } from "../../componentes/Collumn";
import { fetchTask, updateTask } from "../../api";
import FormTask from "../../componentes/FormTask";

const COLUMNS: ColumnType[] = [
  { id: "PENDING", title: "Pendientes", state: false },
  { id: "COMPLETED", title: "Completadas", state: true },
];

const TaskTable = () => {
  const {
    task,
    taskTotal,
    taskPending,
    taskCompleted,
    handleSetTasks,
    handleToggleTask,
  } = useAppContext();
  useEffect(() => {
    fetchTask()
      .then((data: Task[]) => {
        handleSetTasks(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Task:", error);
      });
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = COLUMNS.find((column) => column.id === over.id);

    console.log(taskId);
    const taskSelected: Task | undefined = task.find(
      (task) => task._id === taskId
    );

    if (taskSelected) {
      const taskUpdate: Task = { ...taskSelected, state: newStatus?.state };

      updateTask(taskUpdate)
        .then(() => handleToggleTask(taskUpdate))
        .catch((error) => console.error("Failed to updated Task:", error));

      const tasks = task.map((task) =>
        task._id === taskId
          ? {
              ...task,
              state: newStatus?.state,
            }
          : task
      );
      handleSetTasks(tasks);
    }
  }

  return (
    <div className="p-4 flex justify-center ">
          <div className="w-[780px] max-[765px]:w-full  border border-gray-300 p-5 rounded-md flex flex-col items-center">
            <h1 className="text-3xl text-gray-700 font-bold">
              Tablero de tareas
            </h1>
            <div className="w-full flex justify-between items-center my-10 px-5 max-[425px]:flex-col">
              <h3 className="text-blue-700 font-bold">
                N° Tareas: {taskTotal}
              </h3>
              <h3 className="text-green-700 font-bold">
                Completadas: {taskCompleted}
              </h3>
              <h3 className="text-red-700 font-bold">
                Pendientes: {taskPending}
              </h3>
            </div>

            <FormTask />

            <div className="w-full flex justify-between mt-5 max-[680px]:flex-col items-center">
              <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                {COLUMNS.map((column) => {
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tasks={task.filter((task) =>
                        column.id === "COMPLETED" ? task.state : !task.state
                      )}
                    />
                  );
                })}
              </DndContext>
            </div>
          </div>     
    </div>
  );
};

export default TaskTable;
