import { Duck } from "saga-duck";
import { takeEvery, put, select } from "redux-saga/effects";

const SUB_ADD = "sub_counter/ADD";
const SUB_BEFORE_ADD = "sub_counter/BEFORE_ADD";

class SubCounterDuck extends Duck {
  get quickTypes() {
    return {
      ...super.quickTypes,
      SUB_ADD,
      SUB_BEFORE_ADD
    };
  }

  get reducers() {
    const { types } = this;
    return {
      ...super.reducers,
      subCount: (state = 0, action) => {
        switch (action.type) {
          case types.SUB_ADD:
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
      subCount(state) {
        console.log("raw: ", state);
        return state.subCount;
      }
    };
  }

  get creators() {
    const { types } = this;
    return {
      ...super.creators,
      increment: () => ({
        type: types.SUB_BEFORE_ADD
      })
    };
  }

  *saga() {
    yield super.saga();
    const { types, selector, selectors } = this;
    yield takeEvery(types.SUB_BEFORE_ADD, function*(action) {
      const state = selector(yield select());
      console.log("subState: ", state);
      const count = selectors.subCount(yield select());
      console.log("subCount: ", count);

      yield put({
        type: types.SUB_ADD
      });
    });
  }
}

export default SubCounterDuck;
