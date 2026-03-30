import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { store } from "./redux/store";
import { Provider } from "react-redux";

store.subscribe(() => {
  const state = store.getState();
  // Standardized persistence strategy
  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem("users", JSON.stringify(state.users));
  localStorage.setItem("books", JSON.stringify(state.books));
  localStorage.setItem("issues", JSON.stringify(state.issues));
});

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
