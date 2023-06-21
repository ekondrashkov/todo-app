import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, ITask, tasksRequestAsync } from "../store/store";

export function useTasksData() {
  const tasks = useSelector<RootState, ITask[]>(state => state.payload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tasksRequestAsync());
  }, []);

  return [tasks];
}