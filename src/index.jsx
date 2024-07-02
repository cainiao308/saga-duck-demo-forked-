import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DuckRuntime } from "saga-duck";

import Duck from "./CounterDuck";
import Counter from "./Counter";
import { createLogger } from "redux-logger";

const connectWithDuck = (Component, Duck) => {
  return () => {
    const middlewares =
      process.env.NODE_ENV === "development"
        ? [createLogger({ collapsed: true })]
        : [];
    const duckRuntime = new DuckRuntime(new Duck(), ...middlewares);
    const ConnectedComponent = duckRuntime.root()(
      duckRuntime.connect()(Component)
    );
    return (
      <Provider store={duckRuntime.store}>
        <ConnectedComponent />
      </Provider>
    );
  };
};

const App = connectWithDuck(Counter, Duck);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
