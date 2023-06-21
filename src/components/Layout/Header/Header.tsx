import React, { useState } from 'react';
import styles from './header.css';
import { Search } from './Search';
import { Weather } from './Weather';
import { AddEditTask } from '../../Modal/AddTask';

interface HeaderProps {
  titleName: string;
}

export function Header({ titleName }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerTop}>
          <h1 className={styles.headerTitle}>{titleName}</h1>
          <Weather initialCity='Tbilisi'/>
        </div>
      </div>
    </header>
  );
}
