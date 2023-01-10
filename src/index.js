import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement ? rootElement : document.createElement("div"));

export const Context = React.createContext();

export const AppProvider = (props) => {
  const [pageOffSet, setPageOffSet] = React.useState("");
  function updateOffSet(value) {
    setPageOffSet(value);
  }
  const value = [pageOffSet, updateOffSet];

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
