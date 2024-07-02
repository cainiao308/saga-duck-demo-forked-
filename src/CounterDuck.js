import { Duck, ComposableDuck } from "saga-duck";
import { takeEvery, put, select } from "redux-saga/effects";

import SubCounterDuck from "./SubCounterDuck";

const ADD = "counter/ADD";
const BEFORE_ADD = "counter/BEFORE_ADD";

class CounterDuck extends ComposableDuck {
  get quickTypes() {
    return {
      ...super.quickTypes,
      ADD,
      BEFORE_ADD
    };
  }

  get quickDucks() {
    return {
      ...super.quickDucks,
      subCounter: SubCounterDuck
    };
  }

  get reducers() {
    const { types } = this;
    return {
      ...super.reducers,
      count: (state = 0, action) => {
        switch (action.type) {
          case types.ADD:
            return state + 1;
          default:
            return state;
        }
      }
    };
  }

  get rawSelectors() {
    return {
      ...super.rawSelectors,
      count(state) {
        return state.count;
      }
    };
  }

  get creators() {
    const { types } = this;
    return {
      ...super.creators,
      increment: () => ({
        type: types.BEFORE_ADD
      })
    };
  }

  *saga() {
    yield super.saga();
    const { types, selector, selectors } = this;
    yield takeEvery(types.BEFORE_ADD, function*(action) {
      const state = selector(yield select());
      console.log("state: ", state);
      const count = selectors.count(yield select());
      console.log("count: ", count);

      yield put({
        type: types.ADD
      });
    });
  }
}

export default CounterDuck;
