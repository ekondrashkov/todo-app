import React, { FormEvent, useEffect, useState } from 'react';
import styles from './search.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, searchTasksAction } from '../../../../store/store';
import { useSearchParams } from 'react-router-dom';

const TIMEOUT_SEARCH_DELAY = 500;

export function Search() {
  const dispatch = useDispatch();
  const [ timer, setTimer ] = useState<NodeJS.Timeout | null>(null);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const searchQuery = useSelector<RootState, string>(state => state.searchQuery);
  const [ queryString, setQueryString] = useState(searchQuery);

  const initinInputvalue = searchParams.get("q");

  useEffect(() => {
    if (initinInputvalue) {
      setQueryString(initinInputvalue);
      dispatch(searchTasksAction(initinInputvalue));
    }
  }, [])
  
  function onSearchInput(event: FormEvent<HTMLInputElement>) {
    if (timer) {
      clearTimeout(timer);
    }

    const newQueryString = event.currentTarget.value;
    setQueryString(newQueryString);

    const timeout = setTimeout(() => {
      const query = newQueryString.trim().toLowerCase();
      setSearchParams(`q=${query}`);
      dispatch(searchTasksAction(query));
    }, TIMEOUT_SEARCH_DELAY);

    setTimer(timeout);
  }

  return (
    <input type="text" 
           placeholder='Search Task' 
           className={styles.input} 
           value={queryString} 
           onInput={(event: FormEvent<HTMLInputElement>) => onSearchInput(event)}
    />
  );
}
