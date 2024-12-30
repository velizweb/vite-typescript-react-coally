import { ReactNode, createContext } from "react";
import { useTaskAction } from "../hooks/useTaskAction";
import { Task, User } from "../types";


type AppContextType = {
  task: Task[];
  user: User;
  taskUpdate: Task;
  taskTotal: number;
  taskPending: number;
  taskCompleted: number;
  handleSetTasks: (tasks: Task[]) => void;
  handleAddTask: (task: Task) => void;
  handleRemoveTask: (id: string) => void;
  handleToggleTask: (task: Task) => void;
  handleSelectedTask: (task: Task) => void;
  handleUpdateTask: (task: Task) => void;
  hanldeLogin: (user: User) => void;
};

// Create the context with an initial value of null
export const AppContext = createContext<AppContextType>({} as AppContextType);

// Define the props type for the context provider component
type ContextProviderProps = {
  children: ReactNode;
};

// Define the provider component
function AppContextProvider({ children }: ContextProviderProps) {
  const {
    task,
    user,
    taskUpdate,
    taskTotal,
    taskPending,
    taskCompleted,
    handleAddTask,
    handleRemoveTask,
    handleToggleTask,
    handleSetTasks,
    handleSelectedTask,
    handleUpdateTask,
    hanldeLogin
  } = useTaskAction();

  return (
    <AppContext.Provider
      value={{
        task,
        user,
        taskUpdate,
        taskTotal,
        taskPending,
        taskCompleted,
        handleSetTasks,
        handleAddTask,
        handleRemoveTask,
        handleToggleTask,
        handleSelectedTask,
        handleUpdateTask,
        hanldeLogin
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
