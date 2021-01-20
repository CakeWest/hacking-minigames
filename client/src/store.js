import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import gameReducer from "./reducers/gameReducer";
import uiReducer from "./reducers/uiReducer";
import errorReducer from "./reducers/errorReducer.js";

const rootReducer = combineReducers({
  game: gameReducer,
  ui: uiReducer,
  error: errorReducer,
});

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
