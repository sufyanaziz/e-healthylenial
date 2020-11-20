import React from "react";
import htmr from "htmr";

import Dialog from "@material-ui/core/Dialog";
import { getDateKegiatan } from "../../util/date";

const DialogKonten = ({ detailKonten, open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{ padding: "10px 16px", textAlign: "justify" }}>
        <h2 style={{ marginBottom: 2 }}>{detailKonten.judul_content}</h2>
        <small>{getDateKegiatan(Number(detailKonten.created_at))}</small>
        <div style={{ width: "100%", height: "300px", margin: "14px 0" }}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={`/img/${detailKonten.banner}`}
            alt="image"
          />
        </div>
        <div>{htmr(detailKonten.isi_content)}</div>
        <p style={{ marginTop: 8 }}>
          Read Full On:{" "}
          <a href={detailKonten.sumber} target="_blank">
            {detailKonten.sumber.split("/")[2]}
          </a>
        </p>
      </div>
    </Dialog>
  );
};

export default DialogKonten;
