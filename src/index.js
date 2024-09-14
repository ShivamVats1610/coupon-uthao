import React from "react";
// import ReactDOM from "react-dom";
import { createRoot} from 'react-dom/client';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {  legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./js/reducers";

const couponStore = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// ReactDOM.render(
//   <Provider store={couponStore}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <Provider store={couponStore}>
     <App />
   </Provider>,
);

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
