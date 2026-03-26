import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { store } from "./redux/store";
import { Provider } from "react-redux";

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
