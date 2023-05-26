import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
