import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/storage";
import Layout from "../../components/layout";
import { formatDate, getDateKegiatan } from "../../util/date";
import Category from "../../components/todolist/Category";

import styled from "styled-components";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CircularProgress from "@material-ui/core/CircularProgress";

import DialogAddKegiatan from "../../components/todolist/AddKegiatan";
import DialogDetailKegiatan from "../../components/todolist/DetailKegiatan";
import DialogFinishKegiatan from "../../components/todolist/FinishKegiatan";

const List = props => {
  const [kategori, setKategori] = useState();
  const [idKategori, setIdKategori] = useState();
  const [clickKategori, setClickKategori] = useState(false);
  const [active, setActive] = useState(false);
  const [detailKegiatan, setDetailKegiatan] = useState({});
  const [openDialogAddKegiatan, setOpenDialogAddKegiatan] = useState(false);
  const [openDialogDetailKegiatan, setOpenDialogDetailKegiatan] = useState(
    false
  );
  const [openDialogFinishKegiatan, setOpenDialogFinishKegiatan] = useState(
    false
  );

  const [waktu, setWaktu] = useState("");
  const [activeWaktu, setActiveWaktu] = useState(false);

  const context = useContext(Context);

  const { all_kategori, loading } = context.kategori;
  const { all_kegiatan } = context.kegiatan;

  useEffect(() => {
    context.getAllKategori();
  }, []);

  const onClickKategori = data => {
    const id_kategori = data.id_kategori;
    setIdKategori(id_kategori);
    setKategori(data.nama_kategori);
    context.getAllKegiatanById(id_kategori);
    setClickKategori(true);
    setActiveWaktu(false);
    setWaktu("");
  };

  const onChangeChecked = ({ e, data }) => {
    if (data.status === "finish") {
      window.alert("You are done with this!");
      setOpenDialogDetailKegiatan(false);
    } else {
      setOpenDialogDetailKegiatan(false);
      setOpenDialogFinishKegiatan(true);
    }
  };

  const handleOpenDialogAddNewKegiatan = () => {
    setOpenDialogAddKegiatan(true);
  };
  const handleOpenDialogDetailNewKegiatan = data => {
    setOpenDialogDetailKegiatan(true);
    setOpenDialogFinishKegiatan(false);
    setDetailKegiatan(data);
  };

  const handleChangeWaktu = e => {
    setWaktu(e.target.value);
    setActiveWaktu(true);
  };

  const filterByHari =
    all_kegiatan !== undefined &&
    all_kegiatan.filter(data => {
      const tanggalData = formatDate(Number(data.created_at));
      return tanggalData === waktu;
    });

  const finished =
    all_kegiatan && activeWaktu
      ? filterByHari.filter(data => data.status === "finish")
      : all_kegiatan.filter(data => data.status === "finish");

  const notFinished =
    all_kegiatan && activeWaktu
      ? filterByHari.filter(data => data.status === "not-finished")
      : all_kegiatan.filter(data => data.status === "not-finished");

  const countKegiatan = finished.length + notFinished.length;

  const componentAllKegiatan = all_kegiatan
    .sort((a, b) => b.created_at - a.created_at)
    .map(data => {
      const dateKegiatan = getDateKegiatan(Number(data.created_at));

      return (
        <React.Fragment key={data.id_kegiatan}>
          <ListTodoMain
            status={data.status}
            onClick={() => handleOpenDialogDetailNewKegiatan(data)}
          >
            <div className="list-todo-list">
              <div className="list-todo-left">
                <p>{data.nama_kegiatan}</p>
                <p>{data.keterangan}</p>
                <p>{dateKegiatan} </p>
              </div>
              <div className="list-todo-right">
                <input
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                  checked={data.status === "finish" ? true : false}
                  onChange={e => onChangeChecked({ e, data })}
                />
              </div>
            </div>
          </ListTodoMain>
        </React.Fragment>
      );
    });

  const componentFilterHari = filterByHari
    .sort((a, b) => b.created_at - a.created_at)
    .map(data => {
      const dateKegiatan = getDateKegiatan(Number(data.created_at), true);

      return (
        <React.Fragment key={data.id_kegiatan}>
          <ListTodoMain
            status={data.status}
            onClick={() => handleOpenDialogDetailNewKegiatan(data)}
          >
            <div className="list-todo-list">
              <div className="list-todo-left">
                <p>{data.nama_kegiatan}</p>
                <p>{data.keterangan}</p>
                <p>{dateKegiatan} </p>
              </div>
              <div className="list-todo-right">
                <input
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                  checked={data.status === "finish" ? true : false}
                  onChange={e => onChangeChecked({ e, data })}
                />
              </div>
            </div>
          </ListTodoMain>
        </React.Fragment>
      );
    });

  return (
    <Layout history={props.history}>
      <ListContainer kategori={kategori} kategori_active={active}>
        {loading ? (
          <p>...</p>
        ) : (
          <>
            <DialogAddKegiatan
              open={openDialogAddKegiatan}
              handleClose={setOpenDialogAddKegiatan}
              idKategori={idKategori}
              namaKategori={kategori}
              context={context}
              onToday={setWaktu}
            />
            <DialogDetailKegiatan
              open={openDialogDetailKegiatan}
              handleClose={setOpenDialogDetailKegiatan}
              data={detailKegiatan}
              kategori={kategori}
              updateKegiatanList={context.updateKegiatanList}
            />
            <DialogFinishKegiatan
              open={openDialogFinishKegiatan}
              handleClose={setOpenDialogFinishKegiatan}
              data={detailKegiatan}
              finishKegiatan={context.updateStatusKegiatan}
              loading={loading}
            />
            <div className="list-todo">
              <div className="list-todo-header">
                <h3>To do list</h3>
                {kategori !== undefined && (
                  <button onClick={handleOpenDialogAddNewKegiatan}>
                    Create To do list on {kategori}, now!
                  </button>
                )}
              </div>
              {clickKategori && (
                <div className="list-todo-filter">
                  <p>
                    Filter by date -{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {kategori}
                    </span>
                  </p>
                  <input
                    type="date"
                    value={waktu}
                    onChange={handleChangeWaktu}
                  />
                </div>
              )}
              <div className="list-todo-card">
                {clickKategori ? (
                  context.kegiatan.loading === true ? (
                    <CircularProgress className="list-todo-loading" />
                  ) : all_kegiatan.length === 0 ? (
                    <p className="list-todo-404">
                      You have no list on
                      <span
                        style={{ marginLeft: 5, textDecoration: "underline" }}
                      >
                        {kategori}
                      </span>
                      , you can create one!
                    </p>
                  ) : activeWaktu ? (
                    filterByHari.length === 0 ? (
                      <p style={{ padding: 10 }}>List is not found!</p>
                    ) : (
                      // all_kegiatan by filter hari
                      componentFilterHari
                    )
                  ) : (
                    // pure all_kegiatan or no filter
                    componentAllKegiatan
                  )
                ) : (
                  <p className="list-todo-blank">
                    Please select category <ArrowRightIcon />
                  </p>
                )}
              </div>
            </div>
            <div className="list-kategori">
              <div className="list-kategori-card">
                <div className="list-kategori-hedaer">
                  <h3>Category</h3>
                </div>
                {all_kategori
                  .sort((a, b) => (a.nama_kategori > b.nama_kategori ? 1 : -1))
                  .map(data => {
                    return (
                      <Category
                        key={data.id_kategori}
                        data={data}
                        onClick={() => onClickKategori(data)}
                      />
                    );
                  })}
              </div>
              {clickKategori && (
                <div className="list-info-card">
                  {context.kegiatan.loading ? (
                    <div className="list-info-header">
                      <p>...</p>
                    </div>
                  ) : (
                    <>
                      <div className="list-info-header">
                        <h3>
                          Info {kategori} ({countKegiatan})
                        </h3>
                      </div>
                      <InfoContainer>
                        <div className="info">
                          <span className="bg-info-finish"></span>
                          <p>Finish</p>
                          <p>{finished.length}</p>
                        </div>
                      </InfoContainer>
                      <InfoContainer>
                        <div className="info">
                          <span className="bg-info-not-finished"></span>
                          <p>Not Finished</p>
                          <p>{notFinished.length}</p>
                        </div>
                      </InfoContainer>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </ListContainer>
    </Layout>
  );
};

const ListContainer = styled.div`
  display: flex;

  .list-todo {
    flex: 1;
  }
  .list-kategori {
    margin-left: 10px;
    flex: 0.6;
  }
  .list-todo-card,
  .list-kategori-card,
  .list-info-card {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    margin-bottom: 15px;
  }

  // .list-todo-card {
  //   overflow-y: auto;
  //   max-height: 400px;
  // }

  .list-todo-header,
  .list-todo-filter {
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }

  .list-todo-header button {
    background: var(--mainGreen);
    border: transparent;
    padding: 10px;
    border-radius: 2px;
    color: white;
    cursor: pointer;
    text-transform: capitalize;
  }

  .list-todo-404,
  .list-todo-loading,
  .list-todo-blank {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-transform: capitalize;
  }

  .list-kategori-hedaer,
  .list-kategori-main,
  .list-info-header {
    padding: 10px;
    border-bottom: 1px solid gray;
    text-transform: capitalize;
  }

  .list-kategori-main {
    padding: 12px 10px;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .list-kategori-main:hover {
    background: rgb(230, 230, 230);
  }
  .list-kategori-main .icon {
    margin-right: 10px;
  }
`;

const ListTodoMain = styled.div`
  padding: 10px;
  border-bottom: 1px solid gray;

  :hover {
    background: rgb(240, 240, 240);
    cursor: pointer;
  }

  .list-todo-list {
    border-left: 3px solid
      ${props => (props.status === "finish" ? "var(--mainGreen)" : "#BF4953")};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list-todo-list p {
    margin-left: 6px;
  }

  .list-todo-left {
    margin-right: 10px;
  }
  .list-todo-left p:nth-child(1) {
    font-weight: bold;
    text-transform: capitalize;
  }
  .list-todo-left p:nth-child(2) {
    color: rgb(20, 20, 20);
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .list-todo-left p:nth-child(3) {
    color: rgb(120, 120, 120);
    font-size: 12px;
  }
`;

const InfoContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid gray;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .info {
    display: flex;
    align-items: center;
  }
  .bg-info-finish,
  .bg-info-not-finished {
    height: 10px;
    width: 10px;
    background-color: var(--mainGreen);
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
  .bg-info-not-finished {
    background: #bf4953;
  }
  .info p:nth-child(2) {
    flex: 1;
  }
`;

export default List;
