import { ERROR_RECEIVED } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case ERROR_RECEIVED:
      return action.payload;
    default:
      return state;
  }
}
