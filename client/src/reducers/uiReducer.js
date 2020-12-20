import { OPEN_CONTINUE_MODAL, CLOSE_CONTINUE_MODAL } from "../actions/types";

const initialState = {
  showContinueModal: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_CONTINUE_MODAL:
    case CLOSE_CONTINUE_MODAL:
      return {
        ...state,
        showContinueModal: action.payload,
      };
    default:
      return state;
  }
}
