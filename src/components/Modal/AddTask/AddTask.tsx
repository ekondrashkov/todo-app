import React, { useEffect, useRef, useState } from 'react';
import styles from './addtask.css';
import ReactDOM from 'react-dom';
import { MouseEvent } from 'react';
import { getId, getTodayDate } from '../../../utils/utils';
import { ITask, taskUpdateAsync } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { taskAddAsync } from '../../../store/store';
import { dateMask, addTaskFieldsValidation } from '../../../utils/mask-validators';
const classNames = require('classnames');

interface AddEditTaskProps {
  taskTitle: string;
  onClose: () => void;
  task?: ITask; 
}

interface IClasses {
  health: string;
  work: string;
  home: string;
  other: string;
}

const classes: IClasses = {
  health: classNames(styles.tag, styles.tag_health),
  work: classNames(styles.tag, styles.tag_work),
  home: classNames(styles.tag, styles.tag_home),
  other: classNames(styles.tag, styles.tag_other),
}

function setActiveTag(tag: string): IClasses {
  const tagsStyles = {...classes};
  const activeTag = `tag_${tag}_active`;
  tagsStyles[tag as keyof IClasses] = classNames(styles.tag, styles[activeTag]);
  return tagsStyles;
}

const modalRoot = document.querySelector('#modal') ?? document.body;

export function AddEditTask({ taskTitle, onClose, task }: AddEditTaskProps) {
  const refTaskName = useRef<HTMLInputElement>(null);
  const refTaskDate = useRef<HTMLInputElement>(null);
  const refTaskBtn = useRef<HTMLButtonElement>(null);
  const [ tagStyles, setTagStyles ] = useState(classes);
  const [ taskTagName, setTaskTagName ] = useState("other");
  const dispatch = useDispatch();

  useEffect(() => {
    refTaskName.current?.focus();
    if (refTaskName.current && refTaskDate.current) {
      refTaskName.current.value = task?.name ?? "";
      refTaskDate.current.value = task?.date ?? getTodayDate();
    }

    if (refTaskDate.current && refTaskName.current && refTaskBtn.current) {
      dateMask(refTaskDate.current);
      addTaskFieldsValidation(refTaskDate.current, refTaskName.current);
    }

    if (task) {
      setTagStyles(setActiveTag(task.tag));
      setTaskTagName(task.tag);
    }
  }, []);

  function onTagClick(event: MouseEvent) {
    if (event.target instanceof HTMLButtonElement) {
      const coosenTag = event.target.textContent ?? "other";
      setTagStyles(setActiveTag(coosenTag));
      setTaskTagName(coosenTag);
    }
  }

  function onAddTask() {
    if (refTaskDate.current 
        && !refTaskDate.current?.classList.contains("invalid") 
        && !refTaskName.current?.classList.contains("invalid")
        && refTaskName.current?.value) 
        {
          const newTask: ITask = {
            name: refTaskName.current?.value,
            id: task?.id ?? getId(),
            isDone: false,
            tag: taskTagName,
            date: refTaskDate.current.value,
          }
          task ? dispatch(taskUpdateAsync(newTask)) : dispatch(taskAddAsync(newTask));
          onClose();
        }
  }

  return ReactDOM.createPortal ((
    <div className={styles.modal}>
      <div className={styles.modalAdd}>
        <h2 className={styles.modalTitle}>{taskTitle}</h2>
        <input className={styles.modalInput} placeholder='Task Title' ref={refTaskName}/>
        <div className={styles.modalTaskProps}>
          <div className={styles.tagsList}>
            <button onClick={(event: MouseEvent) => onTagClick(event)} className={tagStyles.health}>health</button>
            <button onClick={(event: MouseEvent) => onTagClick(event)} className={tagStyles.work}>work</button>
            <button onClick={(event: MouseEvent) => onTagClick(event)} className={tagStyles.home}>home</button>
            <button onClick={(event: MouseEvent) => onTagClick(event)} className={tagStyles.other}>other</button>
          </div>
          <input type="text" className={styles.modalTaskDate} maxLength={10} placeholder='dd.mm.yyyy' id='task-date' ref={refTaskDate}/>
        </div>
        <div className={styles.modalControls}>
          <button onClick={onClose} className={styles.cancelBtn} id='add-btn'>Cancel</button>
          <button onClick={() => onAddTask()} className={styles.addBtn} ref={refTaskBtn}>
            {task ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  ), modalRoot);
}
