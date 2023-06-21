import React from 'react';
import styles from './todaytasks.css';
import { useSelector } from 'react-redux';
import { RootState, ITask } from '../../../store/store';
import { getId, getTodayDate } from '../../../utils/utils';
import ReactDOM from 'react-dom';

interface TodayTasksProps {
  setShowTodayTasks: (showTodayTasks: boolean) => void;
}

const modalRoot = document.querySelector('#modal') ?? document.body;
const today = getTodayDate();

export function TodayTasks({ setShowTodayTasks }: TodayTasksProps) {
  const tasks = useSelector<RootState, ITask[]>(state => state.payload);
  const todayTasks = tasks.filter(task => task.date === today && !task.isDone);
  
  return ReactDOM.createPortal ((
    <div className={styles.modal}>
      <div className={styles.modalTasks}>
        <h2 className={styles.modalTitle}>Good Morning</h2>
        <h4 className={styles.modalListTitle}>
          {
            todayTasks.length === 0
              ? "You have no planned tasks for today"
              : "You have the next planned tasks for today:"
          }
        </h4>
        <ul className={styles.modalList}>
          {
            todayTasks.map((task: ITask) => (
              <li key={getId()} className={styles.modalListItem}>{task.name}</li>
            ))
          }
        </ul>
        <button className={styles.modalOkBtn} onClick={() => setShowTodayTasks(false)}>Ok</button>
      </div>
    </div>
  ), modalRoot);
}
