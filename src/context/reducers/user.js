import {
  SET_AUTH,
  SET_ERROR_USER,
  SET_UNAUTH,
  SET_LOADING_USER,
  SET_USER,
  UNSET_ERROR_USER,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
} from "../types";

export const initialState = {
  auth: false,
  details: {},
  loading: false,
  errors: {},
  flash: {},
};

const userReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        auth: true,
      };
    case SET_UNAUTH:
      return {
        ...state,
        auth: false,
      };
    case SET_USER:
      return {
        ...state,
        auth: true,
        details: { ...action.payload },
        loading: false,
        errors: {},
      };
    case SET_LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR_USER:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case UNSET_ERROR_USER:
      return {
        ...state,
        errors: {},
        loading: false,
      };
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        loading: false,
        flash: action.payload,
      };

    case UNSET_FLASH_MESSAGE:
      return {
        ...state,
        loading: false,
        flash: {},
      };
  }
};

export default userReducer;
