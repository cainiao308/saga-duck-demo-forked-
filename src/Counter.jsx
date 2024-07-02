import React from "react";
import { purify } from "saga-duck";

const Counter = purify(function({ duck, store, dispatch }) {
  const { selectors, creators, ducks } = duck;
  console.log("ducks: ", ducks);
  const { subCounter } = ducks;
  console.log("store: ", store);
  const count = selectors.count(store);
  console.log("selectors: ", selectors);
  const subCount = subCounter.selectors.subCount(store);
  console.log("subCount: ", subCounter.selectors);
  return (
    <div>
      Clicked {count} times
      <button onClick={() => dispatch(creators.increment())}>加一</button>
      <br />
      Clicked {subCount} times
      <button onClick={() => dispatch(subCounter.creators.increment())}>
        加一
      </button>
    </div>
  );
});

export default Counter;
