import React, { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';

import { loadSearch, resetSearch } from './slice';

export const GiphySearch = () => {
  const dispatch = useDispatch();
  let timeoutId: number;

  const onChange = (e: SyntheticEvent) => {
    e.persist();
    const { target } = e;
    const termLen = (target as HTMLTextAreaElement).value.length;
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    if (termLen === 0) {
      dispatch(resetSearch());
    }
    if (termLen >= 3) {
      timeoutId = window.setTimeout(() => {
        dispatch(loadSearch((target as HTMLTextAreaElement).value));
      }, 300);
    }
  };

  return (
    <React.Fragment>
      <TextField
        id="search"
        label="Search"
        style={{ width: '80vw', padding: '20px 0' }}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default GiphySearch;
