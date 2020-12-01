import React, { useContext, useEffect, useState, useMemo } from "react";
import styled from "styled-components";

import Layout from "../../components/layout";
import { Context } from "../../context/storage";
import { getDateKegiatan } from "../../util/date";
import DialogKonten from "../../components/konten/DialogKonten";
import { Link } from "react-router-dom";
import DialogDetailKegiatan from "../../components/todolist/DetailKegiatan";

const Dashboard = props => {
  const context = useContext(Context);
  let today = new Date();
  const [hour, setHour] = useState("");
  const [salam, setSalam] = useState("");
  const [date, setDate] = useState("");

  const [open, setOpen] = useState(false);
  const [detailKonten, setDetailKonten] = useState({});
  const [openDialogDetailKegiatan, setOpenDialogDetailKegiatan] = useState(
    false
  );
  const [detailKegiatan, setDetailKegiatan] = useState({});
  const [kategori, setKategori] = useState("");

  const { loading } = context.user;
  const { name } = context.user.details;
  const { report_kegiatan } = context.kegiatan;

  useEffect(() => {
    document.title = context.kegiatan.loading
      ? "Dashboard - HealthyLenial"
      : context.kegiatan.report_kegiatan.length === 0
      ? "Dashboard - HealthyLenial"
      : `Dashboard - HealthyLenial (${
          !context.kegiatan.loading && report_kegiatan.length
        })`;
    setOpen(false);
  }, [report_kegiatan]);

  useEffect(() => {
    context.getAllKonten();
    context.getReport();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(today.getHours());
      setDate(
        today.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [today]);

  useEffect(() => {
    if (hour < 12) {
      setSalam("Good Morning");
    } else if (hour < 18) {
      setSalam("Good Afternoon");
    } else if (hour < 20) {
      setSalam("Good Evening");
    } else if (hour <= 24) {
      setSalam("Good Night");
    }
  }, [hour]);

  const handleOpen = data => {
    setOpen(true);
    setDetailKonten(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogDetailContent = Object.keys(detailKonten).length !== 0 && (
    <DialogKonten
      open={open}
      handleClose={handleClose}
      detailKonten={detailKonten}
    />
  );

  const handleOpenDialog = data => {
    setOpenDialogDetailKegiatan(true);
    setDetailKegiatan(data);
    setKategori(data.kategori.nama_kategori);
  };

  const DialogDetail = (
    <DialogDetailKegiatan
      open={openDialogDetailKegiatan}
      handleClose={setOpenDialogDetailKegiatan}
      data={detailKegiatan}
      kategori={kategori}
      page="dashboard"
      history={props.history}
    />
  );

  return (
    <Layout history={props.history}>
      {DialogDetail}
      <DashboardContainer>
        {dialogDetailContent}
        <div className="dashboard-top">
          <div className="dashboard-top-welcome">
            {loading ? <small>Loading...</small> : <p>Welcome Back, {name}!</p>}
          </div>
          <div className="dashboard-top-greeting">
            {date !== "" ? (
              <p>
                {salam} | {date}
              </p>
            ) : (
              <small>loading...</small>
            )}
          </div>
        </div>

        <div className="dashboard-mid">
          <div className="dashboard-mid-reminder" style={{ marginRight: 10 }}>
            <div className="header">
              <h2>Reminder</h2>
              {context.kegiatan.loading ? (
                <p></p>
              ) : (
                <small>
                  You have <b>{report_kegiatan.length}</b> unfinished work!
                </small>
              )}
            </div>
            {context.kegiatan.loading ? (
              <p style={{ margin: 10 }}>Load data...</p>
            ) : report_kegiatan.length === 0 ? (
              <h3 style={{ margin: 10 }}>
                Congrats, you have 0 unfinished work 🥳
              </h3>
            ) : (
              report_kegiatan
                .sort((a, b) => b.created_at - a.created_at)
                .map(report => {
                  const dateKegiatan = getDateKegiatan(
                    Number(report.created_at)
                  );
                  return (
                    <ListTodoMain
                      status={report.status}
                      onClick={() => handleOpenDialog(report)}
                      key={report.id_kegiatan}
                    >
                      <div className="list-todo-list">
                        <div className="list-todo-left">
                          <p>{report.nama_kegiatan}</p>
                          <p>{report.keterangan}</p>
                          <p>
                            {dateKegiatan} | Category :{" "}
                            <b>{report.kategori.nama_kategori}</b>
                          </p>
                        </div>
                      </div>
                    </ListTodoMain>
                  );
                })
            )}
          </div>
          <div className="dashboard-mid-content">
            <div className="header">
              <h2>Articles</h2>
            </div>
            <div className="content-list">
              {context.konten.loading ? (
                <p style={{ margin: 10 }}>Load data...</p>
              ) : (
                <div>
                  {context.konten.length !== 0 &&
                    context.konten.data
                      .sort((a, b) => b.created_at - a.created_at)
                      .map((val, index) => {
                        return (
                          <div
                            className="list"
                            key={index}
                            onClick={() => handleOpen(val)}
                          >
                            <div className="list-image">
                              <img src={`/img/${val.banner}`} alt="image" />
                            </div>
                            <div className="list-information">
                              <p style={{ fontWeight: "bold" }}>
                                {val.judul_content}
                              </p>
                              <p style={{ marginTop: 6, fontSize: 14 }}>
                                {val.isi_content.slice(3, 100)}.....
                              </p>
                              <p
                                style={{
                                  marginTop: "auto",
                                  fontSize: 11,
                                  color: "var(--mainGreen)",
                                }}
                              >
                                {getDateKegiatan(Number(val.created_at))}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardContainer>
    </Layout>
  );
};

const DashboardContainer = styled.div`
  height: auto;
  margin-bottom: 20px;

  .dashboard-top {
    display: flex;
    justify-content: space-around;
  }
  .dashboard-top-welcome,
  .dashboard-top-greeting {
    flex: 1;
    padding: 20px 0;
    text-align: center;
    color: white;
    border-radius: 4px;
  }
  .dashboard-top-welcome {
    background: whie;
    margin-right: 10px;
    color: #025930;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  }
  .dashboard-top-greeting {
    background: #025930;
    margin-left: 10px;
  }

  .dashboard-mid {
    margin-top: 12px;
    height: 82vh;
    display: flex;
  }
  .dashboard-mid-reminder,
  .dashboard-mid-content {
    height: 100%;
    flex: 1;
    background: white;
    box-shadow: 0 0 2px black;
    border-radius: 4px;
  }

  .dashboard-mid-reminder .header,
  .dashboard-mid-content .header {
    padding: 10px;
    border-bottom: 1px solid black;
  }

  // list
  .content-list {
  }
  .list {
    display: flex;
    height: 100px;
    border-bottom: 1px solid black;
    cursor: pointer;
  }
  .list-image {
    flex: 0.4;
    height: 100%;
    border-right: 1px solid black;
  }
  .list-image img {
    width: 100%;
    height: 100%;
  }
  .list-information {
    flex: 1;
    padding: 6px 8px;
    display: flex;
    flex-direction: column;
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
    text-transform: capitalize;
  }
`;

export default Dashboard;
