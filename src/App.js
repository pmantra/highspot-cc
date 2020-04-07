import React, { useState, useReducer, useRef } from 'react';
import './App.css'
import AppHeader from './containers/AppHeader';
import AppBody from './containers/AppBody';
import { cardReducer, pageReducer, layoutReducer } from './reducers/rootReducer';
import useFetch from './hooks/useFetch';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import useLazyLoading from './hooks/useLazyLoading';
import { Loader } from 'semantic-ui-react';
import { DEFAULT_URL, CARD_SELECTOR, DEFAULT_LAYOUT, START_PAGE } from './utils/constants';

function App() {
  //declare the initial state which can be scaled out using redux
  const initialState = {
    cardState: {
      cards: [],
      error: null,
      loading: false,
      totalCount: 0,
    },
    pageState: {
      page: START_PAGE,
      url: DEFAULT_URL,
      nextUrl: DEFAULT_URL,
    },

    layoutState: {
      layout: DEFAULT_LAYOUT
    }
  }

  const [cardData, cardDispatch] = useReducer (cardReducer, initialState.cardState);
  const [pageData, pageDispatch] = useReducer (pageReducer, initialState.pageState);
  const [layoutData, layoutDispatch] = useReducer (layoutReducer, initialState.layoutState);
  const [searchText, setSearchText] = useState ('');

  let scrollRef = useRef(null);
  useInfiniteScroll(scrollRef, pageDispatch);
  useLazyLoading (CARD_SELECTOR, cardData.cards);
  useFetch (pageData.url, searchText, cardDispatch, pageDispatch);

  const handleSearch = (searchText) => {
    cardDispatch ({ type: 'CLEAR_CARDS' });
    setSearchText ('searchText');
    pageDispatch ({ type: 'SEARCH_PAGE', searchText });
  }

  const clearSearch = () => {
    cardDispatch ({ type: 'CLEAR_CARDS' });
    pageDispatch ({ type: 'RESET_PAGE' });
    setSearchText ('');
  }

  const setLayout = (layout) => {
    layoutDispatch ({ type: layout });
  }

  const appHeaderProps = {
    cardCount: cardData.cards.length,
    totalCount: cardData.totalCount,
    handleSearch,
    clearSearch,
    setLayout
  }

  const appBodyProps = {
    cards: cardData.cards,
    showInitialLoading: cardData.loading && pageData.page === 1,
    layout: layoutData.layout
  }

  return (
    <div className="App">
      <AppHeader {...appHeaderProps}/>
      <AppBody {...appBodyProps}/>
      {pageData.page > 1 &&
        <Loader inline active={cardData.loading} size='large'>Loading</Loader>
      }
      <div className='scroll-ref' id='page-bottom-boundary' ref={scrollRef}></div>
    </div>
  );
}

export default App;
