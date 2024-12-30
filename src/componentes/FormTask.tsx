import React, { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { addTask, updateTask } from "../api";
import { Task } from "../types";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const FormTask = () => {
  const { handleAddTask, taskUpdate, handleUpdateTask } = useAppContext();
  const { token } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskUpdate._id) {
      const taskUpdated: Task = { ...taskUpdate, title, description };
      updateTask(taskUpdated, token as string)
        .then((data: Task) => {
          handleUpdateTask(data);
          setTitle("");
          setDescription("");

          toast.success('Actualizado correctamente', {
            position: 'top-right',
          });
        })
        .catch((error) => console.error("Failed to updated Task:", error));

      return;
    }

    if(!title.trim() || !description.trim()){
      toast.error('El título y Descripción son requeridos', {
        position: 'top-right',
      });
      return;
    }
      

    addTask({ title, description, state: false }, token as string)
      .then((data: Task) => {
        handleAddTask(data);
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Failed to fetch Task:", error);
      });
  };

  useEffect(() => {
    setTitle(taskUpdate.title);
    setDescription(taskUpdate.description);
  }, [taskUpdate]);

  return (
    <div className="w-full">
      <h3>Agregar Tarea</h3>
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre de la tarea"
          className="w-full mr-3 border border-gray-300 p-2 rounded-md mt-2"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id=""
          placeholder="Ingrese descripción"
          className="w-full border border-gray-300 p-2 rounded-md mt-2"
        >
          {description}
        </textarea>

        <button
          type="submit"
          className="w-40 mx-auto bg-blue-500 text-white p-2 rounded-md mt-2 flex justify-center items-center"
        >
          <FaPlus className="mr-2" />{" "}
          {!taskUpdate._id ? "Agregar" : "Actualizar"}
        </button>
      </form>
    </div>
  );
};

export default FormTask;
