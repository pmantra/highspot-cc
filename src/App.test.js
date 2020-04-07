import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { renderHook } from "@testing-library/react-hooks";
import { API, DEFAULT_PAGE_SIZE, START_PAGE } from './utils/constants';
import { buildUrl } from './utils/helper';
import fetchMock from "fetch-mock";
import useFetch from './hooks/useFetch';
import { act } from "react-test-renderer";

function setupIntersectionObserverMock({
  observe = () => null,
  unobserve = () => null,
} = {}) {
  class IntersectionObserver {
    observe = observe;
    unobserve = unobserve;
  }
  Object.defineProperty(
    window,
    'IntersectionObserver',
    { writable: true, configurable: true, value: IntersectionObserver }
  );
  Object.defineProperty(
    global,
    'IntersectionObserver',
    { writable: true, configurable: true, value: IntersectionObserver }
  );
}

beforeEach(() => {
  setupIntersectionObserverMock();
});

afterEach(() => {

});


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/* describe("useFetch", () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });

  it("should return data with a successful request", async () => {
    const { result } = renderHook(() => useFetch());
    const url = buildUrl (API, '', START_PAGE, DEFAULT_PAGE_SIZE);
    fetchMock.mock(url, {
      returnedDataSize: DEFAULT_PAGE_SIZE
    });
    await act(async () => {
      result.current.callApi(url);
    });

    expect(result.current.data._pageSize).toBe({
      returnedDataSize: DEFAULT_PAGE_SIZE
    });
  });
}); */