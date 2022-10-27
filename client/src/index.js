import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { DocumentContextProvider } from "./context/documentContext/DocumentContext";
import { TodoContextProvider } from "./context/todoContext/TodoContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DocumentContextProvider>
        <TodoContextProvider>
          <App/>
        </TodoContextProvider>
      </DocumentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
