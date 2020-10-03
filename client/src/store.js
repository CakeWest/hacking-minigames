import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import game from "./reducers/gameReducer";
import ui from "./reducers/uiReducer";
import error from "./reducers/errorReducer.js";
import tuner from "./reducers/tunerReducer.js";

const rootReducer = combineReducers({
  game,
  tuner,
  ui,
  error,
});

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
