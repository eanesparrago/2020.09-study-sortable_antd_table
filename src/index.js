import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import store from "./store";
import { itemsReceived } from "./itemsSlice";

const items = [
  { id: nanoid(), content: "Item 1" },
  { id: nanoid(), content: "Item 2" },
  { id: nanoid(), content: "Item 3" },
  { id: nanoid(), content: "Item 4" },
  { id: nanoid(), content: "Item 5" },
];

store.dispatch(itemsReceived(items));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
