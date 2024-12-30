import { useEffect, useReducer } from "react"
//import { initialState, taskReducer } from "../reducer/reducer"
import { initialState, reducer } from "../reducer"
import { ActionTypes } from "../actions"
import { Task, User } from "../types"


export const useTaskAction = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const { task, taskUpdate, user } = state;
  /*useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  }, [state.task])*/
  

  const taskTotal = task.length;
  const taskPending = task.filter(task => !task.state).length;
  const taskCompleted = task.filter(task => task.state).length;

  const hanldeLogin = (user: User) => dispatch({ type: ActionTypes.LOGIN, payload: user })
  const handleLoading = (loading:boolean)=>  dispatch({ type: ActionTypes.LOADING, payload: loading })
  
  const handleSetTasks = (tasks: Task[]) => dispatch({ type: ActionTypes.SET_TASK, payload: tasks });

  const handleAddTask = (task: Task) => dispatch({ type: ActionTypes.ADD_TASK , payload: task })

  const handleRemoveTask = (id: string) => dispatch({ type: ActionTypes.REMOVE_TASK, payload: id })
    

  const handleToggleTask = (task: Task) => dispatch({ type: ActionTypes.TOGGLE_TASK, payload: task })

  const handleSelectedTask = (task: Task) => dispatch({ type: ActionTypes.TASK_SELECTED, payload: task })
  const handleUpdateTask = (task: Task) => dispatch({ type: ActionTypes.TASK_TO_UPDATE, payload: task })

  return {
    task,
    user,
    taskUpdate,
    taskTotal,
    taskPending,
    taskCompleted,
    handleAddTask,
    handleRemoveTask,
    handleToggleTask,
    handleLoading,
    handleSetTasks,
    handleSelectedTask,
    handleUpdateTask,
    hanldeLogin
  }
}