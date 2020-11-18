import React from "react";

import PoolIcon from "@material-ui/icons/Pool";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import SportsTennisIcon from "@material-ui/icons/SportsTennis";
import SportsBasketballIcon from "@material-ui/icons/SportsBasketball";

const Category = ({ onClick, data }) => {
  return (
    <div className={`list-kategori-main`} onClick={onClick}>
      {data.icon_kategori === "running" && (
        <DirectionsRunIcon className="icon" />
      )}
      {data.icon_kategori === "swimming" && <PoolIcon className="icon" />}
      {data.icon_kategori === "football" && (
        <SportsSoccerIcon className="icon" />
      )}
      {data.icon_kategori === "cycling" && (
        <DirectionsBikeIcon className="icon" />
      )}
      {data.icon_kategori === "tennis" && <SportsTennisIcon className="icon" />}
      {data.icon_kategori === "basketball" && (
        <SportsBasketballIcon className="icon" />
      )}
      <p>{data.nama_kategori}</p>
    </div>
  );
};

export default Category;
