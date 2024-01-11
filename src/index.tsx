import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "./css/index.css";
import theme from "./app/MaterialTheme";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketContext, socket } from "./app/context/socket";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <SocketContext.Provider value={socket}>
            <App />
          </SocketContext.Provider>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
