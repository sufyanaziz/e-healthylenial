import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import LoadingComponent from "../loading";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import UpdateIcon from "@material-ui/icons/Update";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const DetailKegiatan = ({
  open,
  handleClose,
  data,
  updateKegiatanList,
  loading,
  deleteKegiatan,
  page,
  history,
}) => {
  const [updateActive, setUpdateActive] = useState(false);
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [information, setInformation] = useState("");
  const [startWeight, setStartWeight] = useState("");
  const [startHeight, setStartHeight] = useState("");

  const onCloseDialog = () => {
    if (
      namaKegiatan.trim() !== "" ||
      information.trim() !== "" ||
      startWeight.trim() !== "" ||
      startHeight.trim() !== ""
    ) {
      const confirm = window.confirm(
        "The changes you made will be lost, are u sure?"
      );
      if (confirm) {
        setUpdateActive(false);
        setNamaKegiatan("");
        setInformation("");
        setStartWeight("");
        setStartHeight("");
        handleClose(false);
      }
    } else {
      setUpdateActive(false);
      setNamaKegiatan("");
      setInformation("");
      setStartWeight("");
      setStartHeight("");
      handleClose(false);
    }
  };

  const {
    id_kegiatan,
    id_kategori,
    status,
    nama_kegiatan,
    keterangan,
    start_weight,
    end_weight,
    start_height,
    end_height,
    kategori,
  } = data;

  const totalWeight = end_weight - start_weight;
  const totalHeight = end_height - start_height;

  const countEndWeight =
    status !== "finish" ? null : end_weight < start_weight ? (
      <small className="countWH">
        Your Weight decrease about
        <ArrowDropDownIcon style={{ color: "var(--mainRed)" }} />{" "}
        {totalWeight.toFixed(1)} kg
      </small>
    ) : end_weight === start_weight ? (
      <small className="countWH">Your Weight still same!</small>
    ) : (
      <small className="countWH">
        Your Weight increase about
        <ArrowDropUpIcon style={{ color: "var(--mainGreen)" }} /> +
        {totalWeight.toFixed(1)} kg
      </small>
    );

  const countEndHeight =
    status !== "finish" ? null : end_height < start_height ? (
      <small className="countWH">
        Your Height decrease about
        <ArrowDropDownIcon style={{ color: "var(--mainRed)" }} />{" "}
        {totalHeight.toFixed(1)} cm
      </small>
    ) : end_height === start_height ? (
      <small className="countWH">Your Height still same!</small>
    ) : (
      <small className="countWH">
        Your Height increase about
        <ArrowDropUpIcon style={{ color: "var(--mainGreen)" }} /> +
        {totalHeight.toFixed(1)} cm
      </small>
    );

  const disabledButton = () => {
    return namaKegiatan.trim() === "" ||
      information.trim() === "" ||
      startWeight.trim() === "" ||
      startHeight.trim() === ""
      ? true
      : false;
  };

  const handleClickUpdateKegiatan = () => {
    const request = {
      nama_kegiatan: namaKegiatan,
      keterangan: information,
      start_weight: startWeight,
      start_height: startHeight,
    };
    updateKegiatanList({ id_kegiatan, data: request, setUpdateActive });
    setNamaKegiatan("");
    setInformation("");
    setStartWeight("");
    setStartHeight("");
  };

  const handleClickDeleteKegiatan = () => {
    const confirm = window.confirm(
      "⚠️ Are you sure remove this list? When you delete this list, you can't go back!"
    );
    if (confirm) {
      deleteKegiatan({ id_kegiatan, closeDialog: onCloseDialog });
    }
  };

  const handleClickDashboard = () => {
    history.push("/list");
  };

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DetailKegiatanContainer
        status={status}
        btnUpdateActive={updateActive}
        disabledButton={page === "dashboard" ? false : disabledButton()}
      >
        <div className="detail-kegiatan-header">
          <h3>Details List</h3>
          {page === "dashboard"
            ? null
            : status !== "finish" && (
                <button
                  onClick={
                    updateActive
                      ? () => setUpdateActive(false)
                      : () => setUpdateActive(true)
                  }
                >
                  {updateActive ? (
                    <HighlightOffIcon
                      style={{ marginRight: 3, fontSize: 18 }}
                    />
                  ) : (
                    <UpdateIcon style={{ marginRight: 3, fontSize: 18 }} />
                  )}
                  {updateActive ? "Close Edit List" : "Edit List"}
                </button>
              )}
        </div>
        <div className="detail-kegiatan-main">
          <div className="detail-kegiatan-nks">
            <div>
              <p>
                List Name{" "}
                {updateActive && (
                  <small style={{ color: "var(--mainRed)" }}>*edit</small>
                )}
              </p>
            </div>
            <div>
              {updateActive ? (
                <input
                  className="input"
                  value={namaKegiatan}
                  onChange={e => setNamaKegiatan(e.target.value)}
                  placeholder={nama_kegiatan}
                />
              ) : (
                <p>{nama_kegiatan}</p>
              )}
            </div>
          </div>
          <div className="detail-kegiatan-nks">
            <div>
              <p>Category</p>
            </div>
            <div>
              <p style={{ textTransform: "capitalize" }}>
                {kategori && kategori.nama_kategori}
              </p>
            </div>
          </div>
          <div className="detail-kegiatan-nks">
            <div>
              <p>
                Information{" "}
                {updateActive && (
                  <small style={{ color: "var(--mainRed)" }}>*edit</small>
                )}
              </p>
            </div>
            <div>
              {updateActive ? (
                <input
                  className="input"
                  value={information}
                  onChange={e => setInformation(e.target.value)}
                  placeholder={keterangan}
                />
              ) : (
                <p>{keterangan}</p>
              )}
            </div>
          </div>
          <div className="detail-kegiatan-wh">
            <div className="kegiatan-wh-header">
              <div>
                <p>
                  Start Weight (kg){" "}
                  {updateActive && (
                    <small style={{ color: "var(--mainRed)" }}>*edit</small>
                  )}
                </p>
              </div>
              <div>
                <p>End Weight (kg)</p>
              </div>
            </div>
            <div className="kegiatan-wh-main">
              <div>
                {updateActive ? (
                  <input
                    className="input"
                    type="number"
                    value={startWeight}
                    onChange={e => setStartWeight(e.target.value)}
                    style={{ textAlign: "center" }}
                    placeholder={start_weight}
                  />
                ) : (
                  <p>{start_weight}</p>
                )}
              </div>
              <div>
                <p>{end_weight}</p>
              </div>
            </div>
          </div>
          <div className="detail-kegiatan-wh">
            <div className="kegiatan-wh-header">
              <div>
                <p>
                  Start Height (cm){" "}
                  {updateActive && (
                    <small style={{ color: "var(--mainRed)" }}>*edit</small>
                  )}
                </p>
              </div>
              <div>
                <p>End Height (cm)</p>
              </div>
            </div>
            <div className="kegiatan-wh-main">
              <div>
                {updateActive ? (
                  <input
                    className="input"
                    type="number"
                    value={startHeight}
                    onChange={e => setStartHeight(e.target.value)}
                    style={{ textAlign: "center" }}
                    placeholder={start_height}
                  />
                ) : (
                  <p>{start_height}</p>
                )}
              </div>
              <div>
                <p>{end_height}</p>
              </div>
            </div>
          </div>
          <div className="detail-kegiatan-nks">
            <div>
              <p>Status</p>
            </div>
            <div>
              <p className="status-kegiatan">{status}</p>
              {countEndWeight}
              {countEndHeight}
            </div>
          </div>
          <div className="action-kegiatan">
            {page === "dashboard" ? (
              <button
                disabled={false}
                className="update-button"
                onClick={handleClickDashboard}
              >
                Go to list
              </button>
            ) : updateActive ? (
              <button
                onClick={handleClickUpdateKegiatan}
                disabled={disabledButton()}
                className="update-button"
              >
                {loading ? (
                  <LoadingComponent color="var(--mainRed)" iconSize={30} />
                ) : (
                  "Update List"
                )}
              </button>
            ) : (
              status !== "finish" && (
                <button
                  className="delete-button"
                  onClick={handleClickDeleteKegiatan}
                >
                  {loading ? (
                    <LoadingComponent color="white" iconSize={30} />
                  ) : (
                    "Delete List"
                  )}
                </button>
              )
            )}
          </div>
        </div>
      </DetailKegiatanContainer>
    </Dialog>
  );
};

const DetailKegiatanContainer = styled.div`
  height: 500px;
  width: 480px;
  max-height: 700px;

  .detail-kegiatan-header {
    padding: 14px 10px;
    background: ${props =>
      props.status === "finish" ? "var(--mainGreen)" : "var(--mainRed)"};
    color: white;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .detail-kegiatan-header button {
    display: flex;
    align-items: center;
    background: ${({ btnUpdateActive }) =>
      btnUpdateActive ? "var(--mainRed)" : "white"};
    border: ${({ btnUpdateActive }) =>
      btnUpdateActive ? "1px solid white" : "1px solid var(--mainRed)"};
    padding: 2px 10px;
    color: ${({ btnUpdateActive }) =>
      btnUpdateActive ? "white" : "var(--mainRed)"};
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }

  .input {
    outline: none;
    border: transparent;
    width: 100%;
  }

  .detail-kegiatan-nks,
  .action-kegiatan {
    display: flex;
    margin: 10px;
  }
  .detail-kegiatan-wh {
    margin-bottom: 10px;
  }

  .kegiatan-wh-header,
  .kegiatan-wh-main {
    display: flex;
    margin: 0 10px;
  }

  .detail-kegiatan-nks div:nth-child(1) {
    flex: 0.5;
    border: 1px solid black;
    padding: 8px;
    border-radius: 4px 0 0 4px;
    font-weight: bold;
  }
  .detail-kegiatan-nks div:nth-child(2) {
    flex: 1;
    border: 1px solid black;
    padding: 8px;
    border-radius: 0 4px 4px 0;
  }

  .kegiatan-wh-header div:nth-child(1),
  .kegiatan-wh-main div:nth-child(1) {
    flex: 1;
    border: 1px solid black;
    padding: 6px;
    border-radius: 4px 0 0 0;
    font-weight: bold;
    text-align: center;
  }
  .kegiatan-wh-header div:nth-child(2),
  .kegiatan-wh-main div:nth-child(2) {
    flex: 1;
    border: 1px solid black;
    padding: 6px;
    border-radius: 0 4px 0 0;
    font-weight: bold;
    text-align: center;
  }

  .kegiatan-wh-main div:nth-child(1) {
    border-radius: 0 0 0 4px;
    font-weight: 400;
  }
  .kegiatan-wh-main div:nth-child(2) {
    border-radius: 0 0 4px 0;
    font-weight: 400;
  }

  .status-kegiatan {
    color: ${props =>
      props.status === "finish" ? "var(--mainGreen)" : "var(--mainRed)"};
    text-transform: capitalize;
    margin-bottom: ${props => (props.status === "finish" ? "2px" : 0)};
    font-weight: bold;
  }

  .countWH {
    display: flex;
    align-items: center;
    margin-bottom: 1px;
  }

  .action-kegiatan .update-button,
  .action-kegiatan .delete-button {
    padding: 8px;
    background: ${props => (props.disabledButton ? "gray" : "var(--mainRed)")};
    border: transparent;
    color: white;
    border-radius: 4px;
    width: 100%;
    text-align: center;
    outline: none;
    cursor: ${props => (props.disabledButton ? "not-allowed" : "pointer")};
    margin-top: 5px;
  }
  .action-kegiatan .delete-button {
    background: var(--mainRed);
    cursor: pointer;
  }
`;

export default DetailKegiatan;
