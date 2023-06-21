import React, { useEffect, useState } from 'react';
import styles from './main.css';
import { List } from './List';
import { useTasksData } from '../../../hooks/useTasksData';
import { TodayTasks } from '../../Modal/TodayTasks';
import { useSelector } from 'react-redux';
import { RootState, ITask, getTasksSelector } from '../../../store/store';
import { updateTodayDateStore } from '../../../store/storeTodayDate';
import { AddEditTask } from '../../Modal/AddTask';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { Handlers } from './Handlers';
import { TAG_CLASS_MAP } from '../../Tag';

export function Main() {
  const [ data ] = useTasksData();
  const [ showTodayTasks, setShowTodayTasks ] = useState(false);
  const [ addModalOpen, setAddModalOpen ] = useState(false);
  const navigate = useNavigate();

  const params: Readonly<Params<string>> = useParams();
  const filtertag = params.tag ?? "";

  const tasks = useSelector<RootState, ITask[]>(state => state.payload);
  const query = useSelector<RootState, string>(state => state.searchQuery);
  const displayedTasks = getTasksSelector({ payload: tasks, searchQuery: query }).filter(task => task.tag.includes(filtertag));

  useEffect(() => {
    const isTodayModalOpen = updateTodayDateStore();
    isTodayModalOpen && setShowTodayTasks(true);
    !Object.keys(TAG_CLASS_MAP).includes(filtertag) && navigate("/tasks/");
  }, []);

  function onOpen() {
    setAddModalOpen(true);
  }

  function onClose() {
    setAddModalOpen(false);
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Handlers onOpen={onOpen} activeTag={filtertag}/>
        {data && <List title='All Tasks' tasks={displayedTasks} isDone={false} />}
        {data && <List title='Completed Tasks' tasks={displayedTasks} isDone={true} />}
      </div>

      {showTodayTasks && <TodayTasks setShowTodayTasks={setShowTodayTasks}/>}
      {addModalOpen && <AddEditTask taskTitle='Add New Task' onClose={onClose} />}
    </main>
  );
}
