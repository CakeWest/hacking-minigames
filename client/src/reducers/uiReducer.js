import { CONTINUE_MODAL_OPEN, CONTINUE_MODAL_CLOSE } from "../actions/types";

const initialState = {
  showContinueModal: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTINUE_MODAL_OPEN:
    case CONTINUE_MODAL_CLOSE:
      return {
        ...state,
        showContinueModal: action.payload,
      };
    default:
      return state;
  }
}
