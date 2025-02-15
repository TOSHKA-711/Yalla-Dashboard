import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Provider } from 'react-redux'
import App from "./App.jsx";
import MyProvider from "./dashboard/ContextApi/Provider.jsx";
import "./index.css";
// import MyProvider from "./dashboard/ContextApi/Provider"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </StrictMode>
);
