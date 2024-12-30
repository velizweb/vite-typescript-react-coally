import { ActionTypes, Actions } from "../actions";
import { Task, User } from "../types";

export type State = {
  task: Task[];
  taskUpdate: Task;
  user: User;
};

export const initialState: State = {
  task: [],
  taskUpdate: {
    title: "",
    description: "",
  },
  user: {
    name: "",
    email: "",
    token: "",
  },
};

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case ActionTypes.ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };
    case ActionTypes.REMOVE_TASK:
      return {
        ...state,
        task: state.task.filter((task) => task._id !== action.payload),
      };
    case ActionTypes.TOGGLE_TASK:
      return {
        ...state,
        task: state.task.map((task: Task) => {
          if (task._id === action.payload._id) {
            return { ...task, state: action.payload.state };
          }
          return task;
        }),
      };
    case ActionTypes.TASK_SELECTED:
      return {
        ...state,
        taskUpdate: action.payload,
      };
    case ActionTypes.TASK_TO_UPDATE:
      return {
        ...state,
        task: state.task.map((task: Task) => {
          if (task._id === action.payload._id) {
            return {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
            };
          }
          return task;
        }),
      };
      
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
