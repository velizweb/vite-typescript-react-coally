import { Task, User } from "../types";

// Define action types as an enum to ensure consistency and prevent typos
export enum ActionTypes {
  LOADING = "LOADING",
  ADD_TASK = "ADD_TASK",
  SET_TASK = "SET_TASK",
  REMOVE_TASK = "REMOVE_TASK",
  TOGGLE_TASK = "TOGGLE_TASK",
  TASK_SELECTED = "TASK_SELECTED",
  TASK_TO_UPDATE = "TASK_TO_UPDATE", 
  LOGIN = "LOGIN"
}

// Define type for each action type to enforce type safety
export type LoginAction = {
  type: ActionTypes.LOGIN;
  payload: User;
};

export type SetTasksAction = {
  type: ActionTypes.SET_TASK;
  payload: Task[];
};

export type LoadingAction = {
    type: ActionTypes.LOADING;
    payload: boolean;
};

export type AddTaskAction = {
    type: ActionTypes.ADD_TASK;
    payload: Task;
};

export type ToggleTaskAction = {
    type: ActionTypes.TOGGLE_TASK;
    payload: Task;
};

export type RemoveTaskAction = {
    type: ActionTypes.REMOVE_TASK;
    payload: string;
};

export type SelectedTaskAction = {
  type: ActionTypes.TASK_SELECTED;
  payload: Task;
};

export type UpdateTaskAction = {
  type: ActionTypes.TASK_TO_UPDATE;
  payload: Task;
};




// Define a union type Actions to represent all possible action types
export type Actions =
  | SetTasksAction
  | LoadingAction
  | AddTaskAction
  | RemoveTaskAction
  | ToggleTaskAction
  | SelectedTaskAction
  | UpdateTaskAction
  | LoginAction;