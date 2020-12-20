import {
  GAME_RECEIVED,
  GAME_CLEARED,
  TUNER_SET_FREQUENCY,
  TUNER_SET_IS_TUNED,
} from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case GAME_RECEIVED:
    case GAME_CLEARED:
      return action.payload;
    case TUNER_SET_FREQUENCY:
      return {
        ...state,
        tuner: {
          ...state.tuner,
          currentFrequency: action.payload,
        },
      };
    case TUNER_SET_IS_TUNED:
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
