import {
  SET_KEGIATAN,
  SET_ALL_KEGIATAN,
  SET_LOADING_KEGIATAN,
  SET_ERROR_KEGIATAN,
  SET_STATUS_KEGIATAN,
  SET_UPDATE_KEGIATAN,
  SET_DELETE_KEGIATAN,
  SET_REPORT_KEGIATAN,
} from "../types";

export const initialState = {
  all_kegiatan: [],
  report_kegiatan: [],
  loading: false,
  error: {},
};

const kategoriReducer = (state, action) => {
  let id_kegiatan;
  switch (action.type) {
    case SET_ALL_KEGIATAN:
      return {
        ...state,
        all_kegiatan: action.payload,
        error: {},
        loading: false,
      };
    case SET_KEGIATAN:
      return {
        ...state,
        all_kegiatan: [...state.all_kegiatan, action.payload],
        loading: false,
      };
    case SET_LOADING_KEGIATAN:
      return {
        ...state,
        loading: true,
      };
    case SET_STATUS_KEGIATAN:
      id_kegiatan = state.all_kegiatan.findIndex(
        kegiatan => kegiatan.id_kegiatan === action.id_kegiatan
      );
      state.all_kegiatan[id_kegiatan].end_weight = action.payload.end_weight;
      state.all_kegiatan[id_kegiatan].end_height = action.payload.end_height;
      state.all_kegiatan[id_kegiatan].status = "finish";
      return {
        ...state,
        loading: false,
      };
    case SET_UPDATE_KEGIATAN:
      id_kegiatan = state.all_kegiatan.findIndex(
        kegiatan => kegiatan.id_kegiatan === action.id_kegiatan
      );
      state.all_kegiatan[id_kegiatan].nama_kegiatan =
        action.payload.nama_kegiatan;
      state.all_kegiatan[id_kegiatan].keterangan = action.payload.keterangan;
      state.all_kegiatan[id_kegiatan].start_weight =
        action.payload.start_weight;
      state.all_kegiatan[id_kegiatan].start_height =
        action.payload.start_height;
      return {
        ...state,
        loading: false,
      };
    case SET_DELETE_KEGIATAN:
      const deleteKegiatan = state.all_kegiatan.filter(
        kegiatan => kegiatan.id_kegiatan !== action.id_kegiatan
      );
      return {
        ...state,
        loading: false,
        all_kegiatan: deleteKegiatan,
      };
    case SET_REPORT_KEGIATAN:
      return {
        ...state,
        loading: false,
        report_kegiatan: action.payload,
      };
    case SET_ERROR_KEGIATAN:
      return {
        ...state,
        all_kegiatan: [],
        error: action.payload,
        loading: false,
      };
    default:
      return { state };
  }
};

export default kategoriReducer;
