import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GiphyFetch, GifsResult, GifResult } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { AppThunk, RootState } from '../../app/store';

const gf = new GiphyFetch('ZPKYxDsRMIbTqQANqqcM3RemgvSLZpLP');

interface SearchResult {
  term?: string;
  current?: GifsResult;
  results?: IGif[];
}

interface GiphyBrowserState {
  value: {
    gifs: IGif[];
    current?: GifsResult;
    selectedId?: string;
    detail?: IGif[];
    search?: SearchResult;
  };
}

const initialState: GiphyBrowserState = {
  value: {
    gifs: [],
    current: undefined,
    selectedId: undefined,
    detail: [],
    search: {
      term: '',
      current: undefined,
      results: [],
    },
  },
};

export const slice = createSlice({
  name: 'giphy',
  initialState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<string>) => {
      state.value = {
        ...state.value,
        selectedId: String(action.payload),
        detail: state.value.gifs.filter((g) => g.id === action.payload),
      };
    },
    setDetail: (state, action: PayloadAction<IGif>) => {
      state.value = {
        ...state.value,
        selectedId: String(action.payload.id),
        detail: [action.payload],
      };
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.value.search = {
        ...state.value.search,
        term: action.payload,
      };
    },
    setSearchResult: (state, action: PayloadAction<SearchResult>) => {
      const { term, current } = action.payload;

      const results =
        current?.data &&
        state.value.search?.results &&
        term === state.value.search?.term
          ? state.value.search.results.concat(current.data)
          : current?.data;
      state.value.search = {
        term,
        current,
        results,
      };
    },
    resetSearch: (state, action: PayloadAction) => {
      state.value.search = {
        term: '',
        current: undefined,
        results: undefined,
      };
    },
    nextPage: (state, action: PayloadAction<GifsResult>) => {
      const { data } = action.payload;
      state.value = {
        gifs: state.value.gifs.concat(data),
        current: action.payload,
      };
    },
  },
});

export const {
  nextPage,
  setSelectedId,
  setDetail,
  setSearchTerm,
  setSearchResult,
  resetSearch,
} = slice.actions;

export const loadData = (
  offset: number,
  limit: number = 20
): AppThunk => async (dispatch) => {
  try {
    const data: GifsResult = await gf.trending({ offset, limit });
    dispatch(nextPage(data));
  } catch (e) {
    console.error(e);
  }
};

export const loadDetails = (id: string): AppThunk => async (dispatch) => {
  try {
    const data: GifResult = await gf.gif(id);
    dispatch(setDetail(data.data));
  } catch (e) {
    console.error(e);
  }
};

export const loadSearch = (
  term: string,
  offset: number = 1
): AppThunk => async (dispatch) => {
  try {
    const current: GifsResult = await gf.search(term, {
      sort: 'relevant',
      offset,
    });
    dispatch(
      setSearchResult({
        term,
        current,
      })
    );
  } catch (e) {
    console.error(e);
  }
};

export const selectAllItems = (state: RootState) => state.giphy.value.gifs;
export const selectSearchResults = (state: RootState) =>
  state.giphy.value.search?.results;
export const selectPagination = (state: RootState) =>
  state.giphy.value.current?.pagination;
export const selectSearchPagination = (state: RootState) =>
  state.giphy.value.search?.current?.pagination;
export const selectSearchTerm = (state: RootState) =>
  state.giphy.value.search?.term;
export const selectDetail = (state: RootState) => state.giphy.value.detail;

export default slice.reducer;
