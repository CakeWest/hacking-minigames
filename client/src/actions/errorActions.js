import ERROR_RECEIVED from "./types";

export const receiveError = (game) => {
  return {
    type: ERROR_RECEIVED,
    payload: game,
  };
};
