import { SET_KATEGORI, SET_ALL_KATEGORI, SET_LOADING_KATEGORI } from "../types";

export const initialState = {
  kategori: {},
  all_kategori: [],
  loading: false,
};

const kategoriReducer = (state, action) => {
  switch (action.type) {
    case SET_KATEGORI:
      return {
        ...state,
        kategori: action.payload,
        loading: false,
      };
    case SET_ALL_KATEGORI:
      return {
        ...state,
        all_kategori: action.payload,
        loading: false,
      };
    case SET_LOADING_KATEGORI:
      return {
        ...state,
        loading: true,
      };

    default:
      return { state };
  }
};

export default kategoriReducer;
