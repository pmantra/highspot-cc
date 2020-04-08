## Install Instructions
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Run the app in production mode (recommended) or development mode

### Production Mode
In the project directory, you can run:
### `yarn build`
Builds the app for production to the `build` folder.<br />
To serve the build folder (install serve `yarn global add serve`)

### `serve -s build`
Runs the app in the production mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### Development Mode
In the project directory, you can run:
### `yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Libraries
App is build using following libraries
1. ReactJS
2. Semantic UI React - a rich component library that the app leverages on

## Features
1. First set of 20 cards are displayed to the user immediately
2. Next set of 20 cards will be shown as the user scrolls down until all cards have been displayed
3. User can search cards with name and results are shown that partially match the name
4. Search results contain cards with image and the following attributes
    1. Name
    2. Set Name
    3. Type
    4. Text (on hover)
    5. Cost
    6. Health
    7. Power
5. There are 3 different layouts provided for the user to browser the cards
    a. Default
    b. Relaxed
    c. Compact

## Implementation Details
### State
All state is stored in App component and redux style stores to organize cards, page and urls and layout. The reducers can be plugged in with a redux store if needed

### Hooks
There are 3 hooks, each with a specific functionality
1. useFetch
This hook is used to fetch cards from api on user scroll or on search by name. Each fetch updates the store with card and page info
2. useInfiniteScroll
This hook uses the browser's InteresectionObserver API to listen to scroll event that reaches the scrollRef in the HTML and updates the page store which then calls the useEffect hook to fetch cards with the next page
3. useLazyLoading
This hook also uses the InteresectionObserver API to lazily load the images from api on the UI by  showing a placeholder and only download the images and shown them once newly fetched cards are in viewport

## Known Issues
1. Infinite scroll is disabled on search results - only shows first 20 search results
2. No results message is displayed on loading screen
3. Needs more unit tests

## References
1. Official React Hooks Documentation [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)
2. Official Semantic React UI Documentation [https://react.semantic-ui.com/](https://react.semantic-ui.com/)
3. Smashing Magazine - Implement infinite scroll with lazy image loading [https://www.smashingmagazine.com/2020/03/infinite-scroll-lazy-image-loading-react/](https://www.smashingmagazine.com/2020/03/infinite-scroll-lazy-image-loading-react/).
4. Create your own useFetch hook [https://medium.com/better-programming/learn-to-create-your-own-usefetch-react-hook-9cc31b038e53](https://medium.com/better-programming/learn-to-create-your-own-usefetch-react-hook-9cc31b038e53)
5. MDN Intersection API [https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
