import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

import { getTodayDate } from "../../util/date";
import LoadingComponent from "../loading";

const AddKegiatan = ({
  open,
  handleClose,
  idKategori,
  namaKategori,
  context,
  onToday,
  loading,
}) => {
  const [nama_kegiatan, setNama_kegiatan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [start_weight, setStart_weight] = useState("");
  const [start_height, setStart_height] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onCloseDialog = () => {
    handleClose(false);
    setNama_kegiatan("");
    setKeterangan("");
    setStart_weight("");
    setStart_height("");
  };

  const onSubmitKegiatan = e => {
    e.preventDefault();

    const data_database = {
      id_kategori: idKategori,
      nama_kegiatan,
      start_weight,
      start_height,
      keterangan,
    };
    onToday(getTodayDate);
    context.addNewKegiatan({ data_database, onCloseDialog, namaKategori });
  };

  const buttonDisabled = () => {
    return nama_kegiatan.trim() === "" ||
      keterangan.trim() === "" ||
      start_weight.trim() === "" ||
      start_height.trim() === ""
      ? true
      : false;
  };

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <AddKegiatanContainer buttonDisabled={buttonDisabled()}>
        <div className="add-kegiatan-header">
          <h3>Add New list ({namaKategori})</h3>
        </div>
        <form className="add-kegiatan-form" onSubmit={onSubmitKegiatan}>
          <div className="add-kegiatan-input-namaKegiatan">
            <TextField
              className="input"
              label="List Name"
              variant="outlined"
              fullWidth
              value={nama_kegiatan}
              onChange={e => setNama_kegiatan(e.target.value)}
            />
          </div>
          <div className="add-kegiatan-input-keteranganKegiatan">
            <TextField
              className="input"
              label="Information"
              variant="outlined"
              fullWidth
              multiline
              value={keterangan}
              onChange={e => setKeterangan(e.target.value)}
            />
          </div>
          <div className="add-kegiatan-input-wh">
            <TextField
              className="input"
              label="Start Weight (kg)"
              variant="outlined"
              fullWidth
              type="number"
              style={{ marginRight: 10 }}
              value={start_weight}
              onChange={e => setStart_weight(e.target.value)}
            />
            <TextField
              className="input"
              label="Start Height (cm)"
              variant="outlined"
              fullWidth
              type="number"
              value={start_height}
              onChange={e => setStart_height(e.target.value)}
            />
          </div>
          <div className="add-kegiatan-submit">
            {loading ? (
              <button className="button-submit">
                <LoadingComponent iconSize={25} color="white" />
              </button>
            ) : (
              <input
                type="submit"
                className="button-submit"
                value="Add New List"
                disabled={buttonDisabled()}
              />
            )}
          </div>
        </form>
      </AddKegiatanContainer>
    </Dialog>
  );
};

const AddKegiatanContainer = styled.div`
  height: 380px;
  width: 450px;
  .add-kegiatan-header {
    text-transform: capitalize;
    padding: 14px 1.5rem;
    border-bottom: 1px solid black;
  }
  .add-kegiatan-form {
    padding: 10px 1.5rem;
    margin-top: 1rem;
  }

  .add-kegiatan-form > div {
    margin-bottom: 16px;
  }

  .add-kegiatan-input-wh {
    display: flex;
  }

  .button-submit {
    margin-top: 10px;
    width: 100%;
    padding: 12px 0;
    background: ${props =>
      props.buttonDisabled ? "rgb(150,150,150)" : "var(--mainGreen)"};
    color: white;
    border: transparent;
    border-radius: 4px;
    cursor: ${props => (props.buttonDisabled ? "not-allowed" : "pointer")};
  }
`;

export default AddKegiatan;
