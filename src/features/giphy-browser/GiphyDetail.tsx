import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadDetails, selectDetail } from './slice';
import Layouts from '../../layouts';

import { Gif } from '@giphy/react-components';

export const GiphyDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const items = useSelector(selectDetail);
  console.log('items', items, id);
  useEffect(() => {
    if (!items || !items.length) {
      dispatch(loadDetails(id));
    }
  });

  console.log('gif', items);

  return (
    <Layouts.Main>
      {items &&
        items.map((gif) => (
          <Gif gif={gif} key={gif.id} width={window.innerWidth} />
        ))}
    </Layouts.Main>
  );
};

export default GiphyDetail;
