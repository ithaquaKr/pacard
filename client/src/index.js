import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { DocumentContextProvider } from "./context/documentContext/DocumentContext";
import { CardContextProvider } from "./context/cardContext/CardContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DocumentContextProvider>
        <CardContextProvider>
          <App/>
        </CardContextProvider>
      </DocumentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
