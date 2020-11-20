import { SET_KONTEN, SET_LOADING_KONTEN, SET_ERROR_KONTEN } from "../types";

export const initialState = {
  data: [],
  loading: false,
  error: {},
};

const kontenReducer = (state, action) => {
  switch (action.type) {
    case SET_KONTEN:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SET_LOADING_KONTEN:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR_KONTEN:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return { state };
  }
};

export default kontenReducer;
