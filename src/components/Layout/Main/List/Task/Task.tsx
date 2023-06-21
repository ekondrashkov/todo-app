import React, { useState } from 'react';
import styles from './task.css';
import { ITask, taskDeleteAsync, taskUpdateAsync } from '../../../../../store/store';
import { Tag } from '../../../../Tag';
import { CheckboxIcon } from '../../../../Svg/CheckboxIcon';
import { useDispatch } from 'react-redux';
import { DeleteIcon } from '../../../../Svg/DeleteIcon';
import { EditBtn } from './EditBtn';
import { AddEditTask } from '../../../../Modal/AddTask';

interface TaskProps {
  taskData: ITask;
}

export function Task({ taskData }: TaskProps) {
  const dispatch = useDispatch();
  const [ isEdit, setIsEdit ] = useState(false);
  const checkboxClass = taskData.isDone ? `${styles.checkbox} ${styles.isDone}` : styles.checkbox;
  const taskNameClass = taskData.isDone ? `${styles.taskNameDone}` : `${styles.taskName}`;
  const tagClass = taskData.isDone ? `${styles.tagDone}` : `${taskData.tag}`;

  function onDone() {
    const newTask = {...taskData};
    newTask.isDone = !newTask.isDone;
    dispatch(taskUpdateAsync(newTask));
  }

  function onRemove() {
    dispatch(taskDeleteAsync(taskData));
  }

  return (
    <li className={styles.taskItem} id={taskData.id} data-found="true">
      <div className={styles.taskContent}>
        <button className={checkboxClass} onClick={onDone}>
          <CheckboxIcon />
        </button> 
        <div>
          <div className={styles.taskNameWrapper}>
            <span className={taskNameClass}>{taskData.name}</span>
            {!taskData.isDone && <EditBtn onEdit={() => setIsEdit(true)}/>}
          </div>
          <div className={styles.tagsWrapper}>
            <Tag tagName={taskData.tag} isDone={taskData.isDone}/>
            <span className={styles.taskDate}>
              {taskData.date}
            </span>
          </div>
        </div>
      </div>

      {!taskData.isDone && 
        <button className={styles.delBtn} onClick={onRemove}>
          <DeleteIcon />
        </button>}

      {isEdit && <AddEditTask taskTitle='Edit Task' task={taskData} onClose={() => setIsEdit(false)}/>}
    </li>
  );
}
