import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/layout";
import { Context } from "../../context/storage";
import LoadingComponent from "../../components/loading";
import Category from "../../components/todolist/Category";
import htmr from "htmr";

import styled from "styled-components";

const History = props => {
  const context = useContext(Context);
  const [activeAll, setActiveAll] = useState(true);
  const [filterKegiatan, setFilterKegiatan] = useState([]);
  const { getAllKategori, kategori, getHistory, kegiatan } = context;
  const [namaKategori, setNamaKategori] = useState("");

  useEffect(() => {
    document.title = "Report - HealthyLenial";
    getAllKategori();
  }, []);

  useEffect(() => {
    getHistory();
  }, []);

  const handleSelectAll = () => {
    setActiveAll(true);
  };

  const handleSelectKategori = data => {
    setActiveAll(false);
    const filter = kegiatan.all_kegiatan.filter(
      value => value.kategori.id_kategori === data.id_kategori
    );
    setNamaKategori(data.nama_kategori);
    setFilterKegiatan(filter);
  };

  const KegiatanEl = (kegiatan, index) => {
    const createdAt = Number(kegiatan.created_at);
    const getDate = new Date(createdAt).toISOString().split("T")[0];
    const statusWeight =
      kegiatan.end_weight > kegiatan.start_weight ? "Increase" : "Decrease";
    const statusHeight =
      kegiatan.end_height > kegiatan.start_height ? "Increase" : "Decrease";

    const message =
      kegiatan.end_weight > kegiatan.start_weight &&
      kegiatan.end_height > kegiatan.start_height
        ? "Good Work! Keep doing that!"
        : "You can try again, keep spirit!!";
    return (
      <div className="history-card-main">
        <p>{getDate}</p>
        <p>{kegiatan.nama_kegiatan}</p>
        <p>{kegiatan.keterangan}</p>
        <p>{kegiatan.start_weight}</p>
        <p>{kegiatan.end_weight}</p>
        <p>{kegiatan.start_height}</p>
        <p>{kegiatan.end_height}</p>
        <p>
          Your Weight is{" "}
          <b
            className={
              kegiatan.end_weight > kegiatan.start_weight
                ? "increase"
                : "decrease"
            }
          >
            {statusWeight}
          </b>
          , and your Height is{" "}
          <b
            className={
              kegiatan.end_height > kegiatan.start_height
                ? "increase"
                : "decrease"
            }
          >
            {statusHeight}
          </b>
          <br />
          <br />
          {message}
        </p>
      </div>
    );
  };

  const CheckAllKegiatan =
    kegiatan.all_kegiatan.length === 0 ? (
      <p style={{ textAlign: "center", marginTop: 10 }}>
        You have 0 finish work!
      </p>
    ) : (
      kegiatan.all_kegiatan
        .sort((a, b) => b.created_at - a.created_at)
        .map((kegiatan, index) => KegiatanEl(kegiatan, index))
    );

  const CheckFilterKegiatan =
    filterKegiatan.length === 0 ? (
      <p
        style={{
          textAlign: "center",
          marginTop: 10,
          textTransform: "capitalize",
        }}
      >
        You Have 0 list On {namaKategori}
      </p>
    ) : (
      filterKegiatan.map((kegiatan, index) => KegiatanEl(kegiatan, index))
    );

  return (
    <Layout history={props.history}>
      <HistoryContainer>
        {kategori.loading && kegiatan.loading ? (
          <LoadingComponent type="linear" />
        ) : (
          <>
            <div className="history-card">
              <h2>Report</h2>
            </div>
            <div className="history-card">
              <h4>Category : </h4>
              <div className="history-category-container">
                <Category
                  data={{ nama_kategori: "all" }}
                  className="history-category-list"
                  onClick={() => handleSelectAll()}
                />
                {kategori.all_kategori
                  .sort((a, b) => (a.nama_kategori > b.nama_kategori ? 1 : -1))
                  .map((value, index) => {
                    return (
                      <Category
                        key={index}
                        data={value}
                        className="history-category-list"
                        onClick={() => handleSelectKategori(value)}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="history-card">
              <div className="history-card-header">
                <p>#</p>
                <p>List Name</p>
                <p>Information</p>
                <p>Start Weight</p>
                <p>End Weight</p>
                <p>Start Height</p>
                <p>End Height</p>
                <p>Status</p>
              </div>
              {activeAll ? CheckAllKegiatan : CheckFilterKegiatan}
            </div>
          </>
        )}
      </HistoryContainer>
    </Layout>
  );
};

const HistoryContainer = styled.div`
  height: 95vh;
  display: flex;
  flex-direction: column;

  .history-card {
    background: white;
    box-shadow: 0 0 4px black;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  .history-card:nth-child(2) {
    overflow-x: auto;
    display: flex;
    align-items: center;
  }
  .history-card:nth-child(3) {
    flex: 1;
    padding: 0;
    overflow-y: auto;
    position: relative;
  }

  .history-category-container {
    display: flex;
    flex: 1;
    margin-left: 10px;
  }
  .history-category-list {
    display: flex;
    background: white;
    box-shadow: 0 0 4px black;
    border-radius: 10px;
    padding: 5px 10px;
    margin-right: 8px;
    text-transform: capitalize;
    align-items: center;
    cursor: pointer;
  }
  .history-category-list:hover {
    background: rgb(230, 230, 230);
  }
  .history-category-list .icon {
    margin-right: 5px;
  }

  .history-card-header,
  .history-card-main {
    display: flex;
    align-items: center;
    text-align: center;
    background: var(--mainGreen);
    color: white;
    font-size: 14px;
  }
  .history-card-header {
    position: sticky;
    top: 0;
    padding: 20px 5px;
  }
  .history-card-main {
    background: white;
    color: black;
    border-bottom: 1px solid black;
    padding: 10px 5px;
  }
  .history-card-main:last-child {
    border-bottom: none;
  }

  .history-card-header p:nth-child(1),
  .history-card-main p:nth-child(1) {
    flex: 0.3;
  }
  .history-card-header p:nth-child(2),
  .history-card-header p:nth-child(3),
  .history-card-main p:nth-child(2),
  .history-card-main p:nth-child(3) {
    flex: 0.8;
  }

  .history-card-header p:nth-child(4),
  .history-card-header p:nth-child(5),
  .history-card-header p:nth-child(6),
  .history-card-header p:nth-child(7),
  .history-card-main p:nth-child(4),
  .history-card-main p:nth-child(5),
  .history-card-main p:nth-child(6),
  .history-card-main p:nth-child(7) {
    flex: 0.4;
  }
  .history-card-header p:nth-child(8),
  .history-card-main p:nth-child(8) {
    flex: 0.5;
  }
  .increase {
    color: var(--mainGreen);
  }
  .decrease {
    color: var(--mainRed);
  }
`;

export default History;
