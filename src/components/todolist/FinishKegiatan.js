import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import LoadingComponent from "../loading";

const FinishKegiatan = ({
  open,
  handleClose,
  data,
  finishKegiatan,
  loading,
}) => {
  const {
    id_kegiatan,
    status,
    nama_kegiatan,
    keterangan,
    start_weight,
    end_weight,
    start_height,
    end_height,
    kategori,
  } = data;

  const [endWeight, setEndWeight] = useState("");
  const [endHeight, setEndHeight] = useState("");

  const onCloseDialog = () => {
    handleClose(false);
    setEndWeight("");
    setEndHeight("");
  };

  const disabledButton = () => {
    return endWeight.trim() === "" || endHeight.trim() === "" ? true : false;
  };

  const handleClickFinishKegiatan = () => {
    const data = {
      end_weight: endWeight,
      end_height: endHeight,
    };
    const confirm = window.confirm(
      "Do you want to continue? if you continue, you can't go back!"
    );
    if (confirm) {
      finishKegiatan({ id_kegiatan, data, closeDialog: onCloseDialog });
    }
  };

  const totalWeight = endWeight - start_weight;
  const totalHeight = endHeight - start_height;

  const countEndWeight =
    endWeight === "" ? null : endWeight < start_weight ? (
      <small className="countWH">
        Your Weight decrease about
        <ArrowDropDownIcon style={{ color: "var(--mainRed)" }} />{" "}
        {totalWeight.toFixed(1)} kg
      </small>
    ) : Number(endWeight) === start_weight ? (
      <small className="countWH">Your Weight still same!</small>
    ) : (
      <small className="countWH">
        Your Weight increase about
        <ArrowDropUpIcon style={{ color: "var(--mainGreen)" }} /> +
        {totalWeight.toFixed(1)} kg
      </small>
    );

  const countEndHeight =
    endHeight === "" ? null : endHeight < start_height ? (
      <small className="countWH">
        Your Height decrease about
        <ArrowDropDownIcon style={{ color: "var(--mainRed)" }} />{" "}
        {totalHeight.toFixed(1)} cm
      </small>
    ) : Number(endHeight) === start_height ? (
      <small className="countWH">Your Height still same!</small>
    ) : (
      <small className="countWH">
        Your Height increase about
        <ArrowDropUpIcon style={{ color: "var(--mainGreen)" }} /> +
        {totalHeight.toFixed(1)} cm
      </small>
    );

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <FinishKegiatanContainer
        status={status}
        disabledButton={disabledButton()}
      >
        <div className="finish-kegiatan-header">
          <h3>Update List (Weight and Height)</h3>
        </div>
        <div className="finish-kegiatan-main">
          <div className="finish-kegiatan-nks">
            <div>
              <p>List Name</p>
            </div>
            <div>
              <p>{nama_kegiatan}</p>
            </div>
          </div>
          <div className="finish-kegiatan-nks">
            <div>
              <p>Category</p>
            </div>
            <div>
              <p style={{ textTransform: "capitalize" }}>
                {kategori && kategori.nama_kategori}
              </p>
            </div>
          </div>
          <div className="finish-kegiatan-nks">
            <div>
              <p>Information</p>
            </div>
            <div>
              <p>{keterangan}</p>
            </div>
          </div>
          <div className="finish-kegiatan-wh">
            <div className="kegiatan-wh-header">
              <div>
                <p>Start Weight (kg)</p>
              </div>
              <div>
                <p>End Weight (kg)</p>
              </div>
            </div>
            <div className="kegiatan-wh-main">
              <div>
                <p>{start_weight}</p>
              </div>
              <div>
                <input
                  type="number"
                  placeholder={end_weight}
                  value={endWeight}
                  onChange={e => setEndWeight(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="finish-kegiatan-wh">
            <div className="kegiatan-wh-header">
              <div>
                <p>Start Height (cm)</p>
              </div>
              <div>
                <p>End Height (cm)</p>
              </div>
            </div>
            <div className="kegiatan-wh-main">
              <div>
                <p>{start_height}</p>
              </div>
              <div>
                <input
                  type="number"
                  placeholder={end_height}
                  value={endHeight}
                  onChange={e => setEndHeight(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="finish-kegiatan-nks">
            <div>
              <p>Status</p>
            </div>
            <div>
              <p className="status-kegiatan">{status}</p>
              {countEndWeight}
              {countEndHeight}
            </div>
          </div>
          <div className="finish-action">
            <button
              onClick={handleClickFinishKegiatan}
              disabled={disabledButton()}
            >
              {loading ? (
                <LoadingComponent iconSize={20} color="white" />
              ) : (
                "Update List"
              )}
            </button>
          </div>
        </div>
      </FinishKegiatanContainer>
    </Dialog>
  );
};

const FinishKegiatanContainer = styled.div`
  height: auto;
  width: 480px;

  input {
    width: 100%;
    text-align: center;
    border: transparent;
  }
  input:focus {
    outline: none;
  }

  .finish-kegiatan-header {
    padding: 14px 10px;
    background: ${props =>
      props.disabledButton ? "var(--mainRed)" : "var(--mainGreen)"};
    color: white;
    margin-bottom: 20px;
  }
  .finish-kegiatan-nks {
    display: flex;
    margin: 10px;
  }
  .finish-kegiatan-wh {
    margin-bottom: 10px;
  }

  .kegiatan-wh-header,
  .kegiatan-wh-main {
    display: flex;
    margin: 0 10px;
  }

  .finish-kegiatan-nks div:nth-child(1) {
    flex: 0.5;
    border: 1px solid black;
    padding: 8px;
    border-radius: 4px 0 0 4px;
    font-weight: bold;
  }
  .finish-kegiatan-nks div:nth-child(2) {
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
    margin-bottom: 5px;
  }

  .finish-action {
    padding: 10px;
  }
  .finish-action button {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: transparent;
    outline: none;
    background: ${props =>
      props.disabledButton ? "gray" : "var(--mainGreen)"};
    color: white;
    cursor: ${props => (props.disabledButton ? "not-allowed" : "pointer")};
    margin-bottom: 10px;
  }

  .countWH {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
  }
`;

export default FinishKegiatan;
