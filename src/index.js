import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { QueryClientProvider } from "react-query";
import queryClient from "./services/queryConfig";

import WatchlistProvider from "./context/WatchlistProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();