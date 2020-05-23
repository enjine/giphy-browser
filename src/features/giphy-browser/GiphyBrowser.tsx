import React, { useEffect, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Gif } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';

import {
  loadData,
  loadSearch,
  setSelectedId,
  selectAllItems,
  selectSearchResults,
  selectPagination,
  selectSearchPagination,
  selectSearchTerm,
} from './slice';
import Layouts from '../../layouts';
import GiphySearch from './GiphySearch';

interface BrowserProps extends RouteComponentProps {}

export const GiphyBrowser: React.FC<BrowserProps> = (props) => {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItems);
  const searchResults = useSelector(selectSearchResults);
  const hasSearchResults = searchResults && searchResults.length;
  const pagination = useSelector(selectPagination);
  const searchPagination = useSelector(selectSearchPagination);
  const searchTerm = useSelector(selectSearchTerm);

  const gifs = searchTerm ? searchResults : items;
  const resultsType = searchTerm
    ? `"${searchTerm}" Search Results`
    : 'Trending Gifs';
  const paginationData = searchPagination || pagination;
  const totalItems = (paginationData && paginationData.total_count) || 0;
  const numLoaded = (gifs && gifs.length) || 0;
  const hasMore = numLoaded !== totalItems;

  useEffect(() => {
    if (!items.length) {
      dispatch(loadData(1));
    }
  });

  const fetchData = () => {
    if (paginationData) {
      const { offset } = paginationData;
      if (searchTerm && hasSearchResults) {
        dispatch(loadSearch(searchTerm, offset + numLoaded));
      } else {
        dispatch(loadData(offset + numLoaded));
      }
    }
  };

  const onGifClick = (gif: IGif, e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setSelectedId(String(gif.id)));
    props.history.push(`/${gif.id}`);
  };

  return (
    <Layouts.Main>
      <header>
        <Typography variant="h3">Giphy Browser</Typography>
        <GiphySearch />
      </header>
      <main id="content" style={{ height: '100vh', overflow: 'auto' }}>
        <InfiniteScroll
          scrollableTarget="content"
          dataLength={numLoaded}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No {`${resultsType}`} to display</b>
            </p>
          }
        >
          {gifs &&
            gifs.map((gif) => (
              <Gif
                gif={gif}
                key={gif.id}
                width={window.innerWidth}
                hideAttribution
                onGifClick={onGifClick}
              />
            ))}
        </InfiniteScroll>
      </main>
    </Layouts.Main>
  );
};

export default withRouter(GiphyBrowser);
