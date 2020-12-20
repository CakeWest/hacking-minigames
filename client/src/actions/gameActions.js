import axios from "axios";
import {
  GAME_REQUEST_OLD,
  GAME_REQUEST_NEW,
  GAME_REQUEST_PASS_TUNING,
  GAME_REQUEST_SUBMIT,
  GAME_RECEIVED,
  GAME_CLEARED,
} from "./types";

import receiveError from "./errorActions";

import { openContinueModal } from "./uiActions";

const devURI = "http://localhost:5000/api/ai/play";

export const requestNewGame = () => {
  return function (dispatch) {
    dispatch({ type: GAME_REQUEST_NEW });

    axios.post(`${devURI}/new`).then((res) => {
      let date = new Date();
      date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + date.toUTCString();
      document.cookie = `aiGameId=${res.data._id}; ${expires}`;

      dispatch(receiveGame(res.data));
    });
  };
};

export const requestOldGame = (id) => {
  return function (dispatch) {
    dispatch({ type: GAME_REQUEST_OLD });

    axios.get(`${devURI}/${id}`).then((res) => {
      if (res.data.error) {
        dispatch(clearGame());
        dispatch(receiveError("Found game with error: " + res.data.error));
      } else {
        dispatch(openContinueModal());
        dispatch(receiveGame(res.data));
      }
    });
  };
};

export const requestPassTuning = (id, targetFrequency, currentFrequency) => {
  return function (dispatch) {
    dispatch({ type: GAME_REQUEST_PASS_TUNING });

    axios
      .put(`${devURI}/${id}/pass-tuning/${targetFrequency}/${currentFrequency}`)
      .then((res) => {
        dispatch(receiveGame(res.data));
        if (res.data.error) dispatch(receiveError(res.data.error));
      });
  };
};

export const requestSubmit = (id, index) => {
  return function (dispatch) {
    dispatch({ type: GAME_REQUEST_SUBMIT });

    axios.put(`${devURI}/${id}/submit/${index}`).then((res) => {
      dispatch(receiveGame(res.data));
      if (res.data.error) dispatch(receiveError(res.data.error));
    });
  };
};

export const receiveGame = (game) => {
  return {
    type: GAME_RECEIVED,
    payload: game,
  };
};

export const clearGame = () => {
  document.cookie = "aiGameId=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  return {
    type: GAME_CLEARED,
    payload: null,
  };
};
