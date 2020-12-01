import styled from "styled-components";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import Header from "../../components/header";

const Landing = () => {
  useEffect(() => {
    document.title = "HealthyLenial";
  }, []);
  return (
    <LandingContainer>
      <div className="landing-card">
        <Header />
        <div className="landing-card-caption">
          <p>
            membantu menjaga pola hidup <br /> sehat anda
          </p>
        </div>
        <div className="landing-card-button">
          <Link to="/login">
            Login <ArrowForwardIcon style={{ marginLeft: 5 }} />
          </Link>
          <Link to="/register">
            Register Now <ExitToAppIcon style={{ marginLeft: 5 }} />
          </Link>
        </div>
      </div>
      <div className="landing-info">
        <div className="landing-info-card">
          <div className="landing-info-todo">
            <CheckCircleOutlineIcon className="icon" />
            <p className="header">to - do - list</p>
            <p>
              Membuat list kegiatan keseharian yang <br /> anda lakukan
            </p>
          </div>
          <div className="landing-info-report">
            <EventNoteIcon className="icon" />
            <p className="header">report</p>
            <p>
              mencatat kegiatan keseharian yang telah <br /> anda lakukan
            </p>
          </div>
        </div>
      </div>
    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to left, #8abf9c 50%, #fff 50%);

  a {
    cursor: pointer;
    padding: 10px 2rem;
    align-items: center;
    display: flex;
    border-radius: 4px;
    text-decoration: none;
  }

  .landing-card {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .landing-card-caption {
    margin-bottom: 1.5rem;
    text-transform: capitalize;
    color: white;
    text-shadow: 0 0 1px black, 0 0 4px black;
    font-size: 1.5rem;
  }

  .landing-card-button {
    margin: 10px 0;
    display: flex;
  }
  .landing-card-button a:nth-child(1) {
    background: white;
    color: #025930;
    margin-right: 10px;
    margin-left: 3rem;
    border: 1px solid #025930;
  }
  .landing-card-button a:nth-child(2) {
    background: #025930;
    color: white;
    margin-left: 1rem;
    border: 1px solid #025930;
  }
  .landing-card-button a:nth-child(1):hover {
    background: rgb(210, 210, 210);
  }

  .landing-info {
    flex: 0.3;
    margin-bottom: 1.5rem;
  }
  .landing-info-card {
    color: white;
    display: flex;
    align-items: center;
  }
  .landing-info-card .icon {
    font-size: 4rem;
    color: #8abf9c;
  }
  .landing-info-report .icon {
    color: white;
  }

  .landing-info-todo,
  .landing-info-report {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .landing-info-todo .header,
  .landing-info-report .header {
    font-weight: bold;
    font-size: 20px;
  }

  .landing-info-todo p {
    color: #8abf9c;
    margin-top: 10px;
    text-transform: capitalize;
  }
  .landing-info-report p {
    color: white;
    margin-top: 10px;
    text-transform: capitalize;
  }
`;

export default Landing;
