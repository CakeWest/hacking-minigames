import { TUNER_SET_FREQUENCY, TUNER_SET_IS_TUNED } from "./types";

export const setCurrentFrequency = (frequency) => {
  return {
    type: TUNER_SET_FREQUENCY,
    payload: frequency,
  };
};

export const setIsTuned = (isTuned) => {
  return {
    type: TUNER_SET_IS_TUNED,
    payload: isTuned,
  };
};
