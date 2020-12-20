import { RECEIVE_ERROR } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ERROR:
      return action.payload;
    default:
      return state;
  }
}
