import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import Routes1 from "./config/Routes1.jsx";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { ChatContextProvider } from "./context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" />
      <ToastContainer position="top-center" />
      <ChatContextProvider>
        <Routes1 />
      </ChatContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
