import React, { useState, useReducer, useRef } from 'react';
import './App.css'
import AppHeader from './containers/AppHeader';
import AppBody from './containers/AppBody';
import { cardReducer, pageReducer } from './reducers/rootReducer';
import useFetch from './hooks/useFetch';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import useLazyLoading from './hooks/useLazyLoading';
import { Loader } from 'semantic-ui-react';
import { API, CARD_SELECTOR, DEFAULT_PAGE_SIZE, START_PAGE, DEFAULT_LAYOUT } from './utils/constants';

function App() {
  const initialState = {
    cardState: {
      cards: [],
      error: null,
      loading: false,
      totalCount: 0
    },
    pageState: {
      page: START_PAGE,
      pageSize: DEFAULT_PAGE_SIZE
    }
  }

  const [cardData, cardDispatch] = useReducer (cardReducer, initialState.cardState);
  const [pageData, pageDispatch] = useReducer (pageReducer, initialState.pageState);
  const [searchText, setSearchText] = useState ('');
  const [gridColumns, setGridColumns] = useState (DEFAULT_LAYOUT);

  useFetch (API, searchText, pageData.page, pageData.pageSize, cardDispatch);
  useLazyLoading (CARD_SELECTOR, cardData.cards);
  let scrollRef = useRef(null);
  useInfiniteScroll(scrollRef, pageDispatch);

  const appHeaderProps = {
    handleSearch: setSearchText,
    pageDispatch
  }

  const appBodyProps = {
    cards: cardData.cards,
    showInitialLoading: cardData.loading && pageData.page < 2
  }

  return (
    <div className="App">
      <AppHeader {...appHeaderProps}/>
      <AppBody {...appBodyProps}/>
      {pageData.page > 1 &&
        <Loader inline active={cardData.loading} size='large'>Loading</Loader>
      }
      <div id='page-bottom-boundary' ref={scrollRef}></div>
    </div>
  );
}

export default App;
