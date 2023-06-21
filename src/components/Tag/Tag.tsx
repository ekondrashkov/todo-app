import React from 'react';
import styles from './tag.css';
const classNames = require('classnames');

interface TagProps {
  tagName: string;
  isDone: boolean;
}

export interface ITags {
  health: {
    nonActive: string;
    active: string;
  };
  work: {
    nonActive: string;
    active: string;
  };
  home: {
    nonActive: string;
    active: string;
  };
  other: {
    nonActive: string;
    active: string;
  };
  all: {
    nonActive: string;
    active: string;
  };
}

export const TAG_CLASS_MAP: ITags = {
  health: {
    nonActive: classNames(styles.tag, styles.tag_health),
    active: classNames(styles.tag, styles.tag_health_active)
  },
  work: {
    nonActive: classNames(styles.tag, styles.tag_work),
    active: classNames(styles.tag, styles.tag_work_active)
  },
  home: {
    nonActive: classNames(styles.tag, styles.tag_home),
    active: classNames(styles.tag, styles.tag_home_active)
  },
  other: {
    nonActive: classNames(styles.tag, styles.tag_other),
    active: classNames(styles.tag, styles.tag_other_active),
  },
  all: {
    nonActive: classNames(styles.tag, styles.tag_all),
    active: classNames(styles.tag, styles.tag_all_active)
  }
}


export function Tag({ tagName, isDone }: TagProps) {
  const tagClass = !isDone 
    ? TAG_CLASS_MAP[tagName as keyof ITags].nonActive ?? TAG_CLASS_MAP.other.nonActive
    : TAG_CLASS_MAP.all.nonActive;

  return (
    <div className={tagClass}>
      {tagName}
    </div>
  );
}
