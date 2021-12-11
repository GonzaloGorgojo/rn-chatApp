import * as Types from "./types";

const initialState = {
  theme: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_THEME:
      return { ...state, theme: action.payload.theme };
    default:
      return state;
  }
};

export { reducer };
