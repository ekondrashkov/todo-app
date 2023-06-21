import { ActionCreator, AnyAction, Reducer } from "redux";
import { ThunkAction } from "redux-thunk";

export type ITask = {
  name: string;
  id: string;
  isDone: boolean;
  tag: string;
  date: string;
}

export type RootState = {
  payload: ITask[];
  searchQuery: string;
}

const initialState: RootState = {
  payload: [],
  searchQuery: ""
};

export const getTasksSelector: (state: RootState) => ITask[] = (state: RootState) =>
  state.payload.filter(item => item.name.toLowerCase().includes(state.searchQuery.toLowerCase()));

const SET_TASKS = 'SET_TASKS'
export const setTasksAction: ActionCreator<AnyAction> = (payload) => ({
  type: SET_TASKS,
  payload,
})

const UPDATE_TASK = 'UPDATE_TASK'
export const updateTaskAction: ActionCreator<AnyAction> = (payload) => ({
  type: UPDATE_TASK,
  payload,
})

const ADD_TASK = 'ADD_TASK'
export const addTasksAction: ActionCreator<AnyAction> = (payload) => ({
  type: ADD_TASK,
  payload,
})

const DELETE_TASK = 'DELETE_TASK'
export const deleteTasksAction: ActionCreator<AnyAction> = (payload) => ({
  type: DELETE_TASK,
  payload,
})

export const SEARCH = 'SEARCH'
export const searchTasksAction: ActionCreator<AnyAction> = (searchQuery) => ({
  type: SEARCH,
  searchQuery,
})

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
  const tasks = state.payload;

  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        payload: action.payload,
      }
    case UPDATE_TASK:
      const updatedTasks = tasks.map(task => task.id === action.payload.id ? action.payload : task);
      return {
        ...state,
        payload: updatedTasks,
      }
    case ADD_TASK:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      }
    case DELETE_TASK:
      return {
        ...state,
        payload: tasks.filter(task => task.id !== action.payload.id),
      }
    case SEARCH:
      return {
        ...state,
        searchQuery: action.searchQuery
      }
    default:
      return state;
  }
}

export const tasksRequestAsync = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
  fetch('http://localhost:3004/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
      const data: RootState = await res.json();
      dispatch(setTasksAction(data));
    })
    .catch(err => console.error(err));
}

export const taskUpdateAsync = (task: ITask): ThunkAction<void, RootState, ITask, AnyAction> => (dispatch, getState) => {
  const state = getState();
  dispatch(updateTaskAction(task));

  fetch(`http://localhost:3004/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch(err => {
    const taskBeforeUpdate = [...state.payload].find(oldTask => oldTask.id === task.id);
    dispatch(updateTaskAction(taskBeforeUpdate));
    console.error(err);
  });
}

export const taskDeleteAsync = (task: ITask): ThunkAction<void, RootState, ITask, AnyAction> => (dispatch, getState) => {
  const state = getState();
  dispatch(deleteTasksAction(task));
  
  fetch(`http://localhost:3004/tasks/${task.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch(err => {
      dispatch(setTasksAction(state));
      console.error(err);
    });
}

export const taskAddAsync = (task: ITask): ThunkAction<void, RootState, ITask, AnyAction> => (dispatch) => {
  dispatch(addTasksAction(task));
  
  fetch('http://localhost:3004/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch(err => console.error(err));
}