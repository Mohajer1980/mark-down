import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import NoteContextProvider from "./NoteContext";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <NoteContextProvider>
      <App />

    </NoteContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
