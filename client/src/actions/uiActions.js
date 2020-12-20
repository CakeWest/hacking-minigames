import { CONTINUE_MODAL_OPEN, CONTINUE_MODAL_CLOSE } from "./types";

export const openContinueModal = () => {
  return {
    type: CONTINUE_MODAL_OPEN,
    payload: true,
  };
};

export const closeContinueModal = () => {
  return {
    type: CONTINUE_MODAL_CLOSE,
    payload: false,
  };
};
