import { useDroppable } from "@dnd-kit/core";

import { TaskCard } from "./TaskCard";
import { Task, Column as ColumnType } from "../types";
import { useAppContext } from "../hooks/useAppContext";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const { handleSelectedTask } = useAppContext();

  const handleUpdate = (task: Task) => handleSelectedTask(task);

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4 max-[767px]:mb-5 h-screen ">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task._id}
              task={task}
              handleUpdate={() => handleUpdate(task)}
            />
          );
        })}
      </div>
    </div>
  );
}
