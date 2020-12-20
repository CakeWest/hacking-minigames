import {
  RECEIVE_GAME,
  RECEIVE_ERROR,
  CLEAR_GAME,
  SET_CURRENT_FREQUENCY,
  SET_IS_TUNED,
} from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_GAME:
    case RECEIVE_ERROR:
    case CLEAR_GAME:
      return action.payload;
    case SET_CURRENT_FREQUENCY:
      return {
        ...state,
        tuner: {
          ...state.tuner,
          currentFrequency: action.payload,
        },
      };
    case SET_IS_TUNED:
      return {
        ...state,
        tuner: {
          ...state.tuner,
          isTuned: action.payload,
        },
      };
    default:
      return state;
  }
}
