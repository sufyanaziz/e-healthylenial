import React from "react";

import PoolIcon from "@material-ui/icons/Pool";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";

const Category = ({ onClick, data, className }) => {
  return (
    <div className={className} onClick={onClick}>
      {data.icon_kategori === "running" && (
        <DirectionsRunIcon className="icon" />
      )}
      {data.icon_kategori === "swimming" && <PoolIcon className="icon" />}
      {data.icon_kategori === "cycling" && (
        <DirectionsBikeIcon className="icon" />
      )}
      <p>{data.nama_kategori}</p>
    </div>
  );
};

export default Category;
