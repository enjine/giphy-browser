import React, { useEffect, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Gif } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';

import { loadDetails, selectDetail } from './slice';
import Layouts from '../../layouts';

export const GiphyDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const items = useSelector(selectDetail);

  useEffect(() => {
    if (!items || !items.length) {
      dispatch(loadDetails(id));
    }
  });

  const onClick = async (gif: IGif, e: SyntheticEvent) => {
    e.preventDefault();
    e.persist();
    await (e.target as HTMLElement).requestFullscreen();
  };

  return (
    <Layouts.Main>
      {items &&
        items.map((gif) => (
          <Gif
            gif={gif}
            key={gif.id}
            width={window.innerWidth}
            onGifClick={onClick}
          />
        ))}
    </Layouts.Main>
  );
};

export default GiphyDetail;
