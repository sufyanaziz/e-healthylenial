import { createContext, useReducer } from "react";
import axios from "../axios";
import userReducer, { initialState as initialStateUser } from "./reducers/user";
import kategoriReducer, {
  initialState as initialStateKategori,
} from "./reducers/kategori";

import kegiatanReducer, {
  initialState as initialStateKegiatan,
} from "./reducers/kegiatan";
import kontenReducer, {
  initialState as initialStateKonten,
} from "./reducers/konten";

import {
  SET_AUTH,
  SET_UNAUTH,
  SET_LOADING_USER,
  SET_USER,
  SET_ERROR_USER,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  UNSET_ERROR_USER,
  SET_ALL_KATEGORI,
  SET_LOADING_KATEGORI,
  SET_ALL_KEGIATAN,
  SET_KEGIATAN,
  SET_STATUS_KEGIATAN,
  SET_LOADING_KEGIATAN,
  SET_ERROR_KEGIATAN,
  SET_UPDATE_KEGIATAN,
  SET_DELETE_KEGIATAN,
  SET_LOADING_KONTEN,
  SET_KONTEN,
  SET_ERROR_KONTEN,
} from "./types";

const Context = createContext();

const Provider = props => {
  const [userState, userDispatch] = useReducer(userReducer, initialStateUser);
  const [kategoriState, kategoriDispatch] = useReducer(
    kategoriReducer,
    initialStateKategori
  );
  const [kegiatanState, kegiatanDispatch] = useReducer(
    kegiatanReducer,
    initialStateKegiatan
  );
  const [kontenState, kontenDispatch] = useReducer(
    kontenReducer,
    initialStateKonten
  );

  const login = ({ data, history }) => {
    userDispatch({ type: SET_LOADING_USER });
    axios
      .post("/user/login", data)
      .then(res => {
        setAuthorization(res.data.token);
        userDispatch({ type: SET_AUTH });
        getUserData();
      })
      .catch(err => {
        const errors = err.response.data.errors;
        if (errors.user) {
          userDispatch({
            type: SET_FLASH_MESSAGE,
            payload: {
              msg: errors.user,
              status: "not-success",
            },
          });
        } else if (errors.password) {
          userDispatch({
            type: SET_FLASH_MESSAGE,
            payload: {
              msg: errors.password,
              status: "not-success",
            },
          });
        } else {
          userDispatch({
            type: SET_FLASH_MESSAGE,
            payload: {
              msg: "something went wrong! we're gonna fix it!",
              status: "not-success",
            },
          });
        }
      });
  };

  const logout = history => {
    localStorage.removeItem("idToken");
    delete axios.defaults.headers.common["Authorization"];
    userDispatch({ type: SET_UNAUTH });
    history.push("/");
  };

  const register = ({ data, history }) => {
    userDispatch({ type: SET_LOADING_USER });
    axios
      .post("/user/register", data)
      .then(() => {
        userDispatch({
          type: SET_FLASH_MESSAGE,
          payload: {
            msg: "Acount is successfully created!",
            status: "success",
          },
        });
        history.push("/login");
      })
      .catch(err => {
        const errors = err.response.data.errors;
        if (errors.username) {
          userDispatch({
            type: SET_FLASH_MESSAGE,
            payload: {
              msg: errors.username,
              status: "not-success",
            },
          });
        } else {
          userDispatch({
            type: SET_FLASH_MESSAGE,
            payload: {
              msg: "something went wrong! we're gonna fix it!",
              status: "not-success",
            },
          });
        }
      });
  };

  const getUserData = () => {
    userDispatch({ type: SET_LOADING_USER });
    axios
      .get("/user/get_data")
      .then(res => {
        userDispatch({ type: SET_USER, payload: res.data.data });
      })
      .catch(err => {
        userDispatch({
          type: SET_ERROR_USER,
          payload: err.response.data.errors,
        });
      });
  };

  const unsetFlashMessage = () => {
    userDispatch({ type: UNSET_FLASH_MESSAGE });
  };

  const clearError = () => {
    userDispatch({ type: UNSET_ERROR_USER });
  };

  // Kategori Section
  const getAllKategori = () => {
    kategoriDispatch({ type: SET_LOADING_KATEGORI });
    axios
      .get("/kategori/get_all")
      .then(res => {
        kategoriDispatch({ type: SET_ALL_KATEGORI, payload: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // End Kategori Section
  // Kegiatan Section
  const getAllKegiatanById = id_kategori => {
    kegiatanDispatch({ type: SET_LOADING_KEGIATAN });
    axios
      .get(`/kegiatan/get_all_id/${id_kategori}`)
      .then(res => {
        kegiatanDispatch({
          type: SET_ALL_KEGIATAN,
          payload: res.data.data,
        });
      })
      .catch(err => {
        kegiatanDispatch({ type: SET_ERROR_KEGIATAN, payload: "not-found" });
      });
  };
  const addNewKegiatan = ({ data_database, onCloseDialog, namaKategori }) => {
    kegiatanDispatch({ type: SET_LOADING_KEGIATAN });
    axios
      .post("/kegiatan/add_kegiatan", data_database)
      .then(res => {
        kegiatanDispatch({
          type: SET_KEGIATAN,
          payload: res.data.data,
        });
        window.alert(
          `Success add new list on ${
            namaKategori.charAt(0).toUpperCase() + namaKategori.slice(1)
          } ✔️`
        );
        onCloseDialog();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const updateStatusKegiatan = ({ id_kegiatan, data, closeDialog }) => {
    kegiatanDispatch({ type: SET_LOADING_KEGIATAN });
    axios
      .post(`/kegiatan/update_status/${id_kegiatan}`, data)
      .then(() => {
        closeDialog();
        window.alert(
          "Your list has been completed. Hope that you enjoy your workout and do more exercise 😄. We're looking forward for your achievement, Fighting 🦾"
        );
        kegiatanDispatch({
          type: SET_STATUS_KEGIATAN,
          payload: data,
          id_kegiatan,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const updateKegiatanList = ({ id_kegiatan, data, setUpdateActive }) => {
    kegiatanDispatch({ type: SET_LOADING_KEGIATAN });
    axios
      .post(`/kegiatan/update_kegiatan/${id_kegiatan}`, data)
      .then(() => {
        window.alert("Your list has been edited");
        kegiatanDispatch({
          type: SET_UPDATE_KEGIATAN,
          payload: data,
          id_kegiatan,
        });
        setUpdateActive(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteKegiatan = ({ id_kegiatan, closeDialog }) => {
    kegiatanDispatch({ type: SET_LOADING_KEGIATAN });
    axios
      .delete(`/kegiatan/delete/${id_kegiatan}`)
      .then(() => {
        kegiatanDispatch({ type: SET_DELETE_KEGIATAN, id_kegiatan });
        closeDialog();
        window.alert("Boooom 💥 Your list has been deleted!");
      })
      .catch(err => {
        kegiatanDispatch({ type: SET_ERROR_KEGIATAN, payload: err });
      });
  };

  const getReport = () => {
    axios
      .get("/kegiatan/get_report")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        kegiatanDispatch({ type: SET_ERROR_KEGIATAN, payload: err });
      });
  };
  // End Kegiatan Section
  // Konten Section
  const getAllKonten = () => {
    kontenDispatch({ type: SET_LOADING_KONTEN });
    axios
      .get("/konten/get_all")
      .then(res => {
        kontenDispatch({ type: SET_KONTEN, payload: res.data.data });
      })
      .catch(err => {
        kontenDispatch({ type: SET_ERROR_KONTEN, payload: err });
      });
  };
  // End Konten Section

  return (
    <Context.Provider
      value={{
        user: { ...userState },
        kategori: { ...kategoriState },
        kegiatan: { ...kegiatanState },
        konten: { ...kontenState },
        login,
        logout,
        register,
        unsetFlashMessage,
        clearError,
        getUserData,
        getAllKategori,
        getAllKegiatanById,
        updateStatusKegiatan,
        deleteKegiatan,
        addNewKegiatan,
        getReport,
        updateKegiatanList,
        getAllKonten,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const setAuthorization = token => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("idToken", IdToken);
  axios.defaults.headers.common["Authorization"] = IdToken;
};

const Consumer = Context.Consumer;

export { Context, Provider, Consumer };
