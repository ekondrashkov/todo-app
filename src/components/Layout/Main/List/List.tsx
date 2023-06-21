import React from 'react';
import styles from './list.css';
import { ITask } from '../../../../store/store';
import { Task } from './Task';

interface ListProps {
  title: string;
  isDone: boolean;
  tasks: ITask[];
}

export function List({ title, isDone, tasks }: ListProps) {
  const displayedData = tasks.filter((task: ITask) => task.isDone === isDone);

  return (
    <div className={styles.list}>
      <h2 className={styles.listTitle}>{title}</h2>
      <ul className={styles.tasks}>
        {
          displayedData.map((task: ITask) => (
            <Task taskData={task} key={task.id} />
          ))
        }
      </ul>
    </div>
  );
}
