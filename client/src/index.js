import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { SetContextProvider } from "./context/setContext/SetContext";
import { CardContextProvider } from "./context/cardContext/CardContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SetContextProvider>
        <CardContextProvider>
          <App/>
        </CardContextProvider>
      </SetContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
