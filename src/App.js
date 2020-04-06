import React, { useState, useReducer, useRef } from 'react';
import './App.css'
import AppHeader from './containers/AppHeader';
import AppBody from './containers/AppBody';
import { cardReducer, pageReducer, layoutReducer } from './reducers/rootReducer';
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
    },
    layoutState: {
      layout: DEFAULT_LAYOUT
    }
  }

  const [cardData, cardDispatch] = useReducer (cardReducer, initialState.cardState);
  const [pageData, pageDispatch] = useReducer (pageReducer, initialState.pageState);
  const [layoutData, layoutDispatch] = useReducer (layoutReducer, initialState.layoutState);
  const [searchText, setSearchText] = useState ('');

  useFetch (API, searchText, pageData.page, pageData.pageSize, cardDispatch);
  useLazyLoading (CARD_SELECTOR, cardData.cards);
  let scrollRef = useRef(null);
  useInfiniteScroll(scrollRef, pageDispatch);

  const appHeaderProps = {
    handleSearch: setSearchText,
    pageDispatch,
    layoutDispatch
  }

  const appBodyProps = {
    cards: cardData.cards,
    showInitialLoading: cardData.loading && pageData.page < 2,
    layout: layoutData.layout
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
