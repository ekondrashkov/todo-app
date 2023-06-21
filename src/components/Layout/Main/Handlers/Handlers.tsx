import React from 'react';
import styles from './handlers.css';
import { Search } from '../../Header/Search';
import { NavLink, useSearchParams } from 'react-router-dom';
import { TAG_CLASS_MAP } from '../../../Tag';
const classNames = require('classnames');

interface HandlersProps {
  onOpen: () => void;
  activeTag: string;
}

export function Handlers({ onOpen }: HandlersProps) {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const queryString = searchParams.get('q');
  const searchAttr = queryString 
    ? `?q=${searchParams.get('q')}`
    : "";

  return (
    <div className={styles.controls}>
      <div className={styles.controlsTop}>
        <Search />
        <button onClick={onOpen} className={styles.newBtn}>+ New Task</button>
      </div>
      <div className={styles.tagsList}>
        <NavLink 
          to={`/tasks/health${searchAttr}`} 
          className={ ({ isActive }) => isActive ? TAG_CLASS_MAP.health.active : TAG_CLASS_MAP.health.nonActive }>
            health
        </NavLink>
        <NavLink 
          to={`/tasks/work${searchAttr}`} 
          className={ ({ isActive }) => isActive ? TAG_CLASS_MAP.work.active : TAG_CLASS_MAP.work.nonActive }>
            work
        </NavLink>
        <NavLink 
          to={`/tasks/home${searchAttr}`} 
          className={ ({ isActive }) => isActive ? TAG_CLASS_MAP.home.active : TAG_CLASS_MAP.home.nonActive }>
            home
        </NavLink>
        <NavLink 
          to={`/tasks/other${searchAttr}`} 
          className={ ({ isActive }) => isActive ? TAG_CLASS_MAP.other.active : TAG_CLASS_MAP.other.nonActive }>
            other
        </NavLink>
        <NavLink 
          to={`/tasks/${searchAttr}`} 
          className={ ({ isActive }) => isActive ? TAG_CLASS_MAP.all.active : TAG_CLASS_MAP.all.nonActive }>
            all
        </NavLink>
      </div>
    </div>
  );
}
