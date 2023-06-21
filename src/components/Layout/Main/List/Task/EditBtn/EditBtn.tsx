import React, { useState } from 'react';
import styles from './editbtn.css';
import { EditIcon } from '../../../../../Svg/EditIcon';

interface EditBtnProps {
  onEdit: () => void;
}

export function EditBtn({ onEdit }: EditBtnProps) {
  return (
    <button className={styles.editTaskBtn} onClick={onEdit} >
      <EditIcon />
    </button>
  );
}
