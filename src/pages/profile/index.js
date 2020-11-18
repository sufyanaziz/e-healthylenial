import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Layout from "../../components/layout";
import { Context } from "../../context/storage";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Profile = props => {
  const context = useContext(Context);
  const date = new Date();
  const { name, username, tanggal_lahir, created_at } = context.user.details;

  const getDay = date.getDate(created_at);
  const getMonth = date.getMonth(created_at) + 1;
  const getYear = date.getFullYear(created_at);

  const paramsUsername = props.match.params.username;

  const fullDate = `${getYear}-${getMonth}-${getDay}`;

  useEffect(() => {
    document.title = `Profile: ${username} - HealthyLenial `;
  }, []);

  return (
    <Layout history={props.history}>
      <ProfileContainer>
        <div className="profile-top">
          <div onClick={props.history.goBack}>
            <ArrowBackIcon />
            <p>Back</p>
          </div>
        </div>
        {paramsUsername !== username ? (
          <div className="not-match-params">
            <p>
              404 | You're not{" "}
              <span style={{ textDecoration: "underline" }}>
                {paramsUsername}
              </span>
            </p>
          </div>
        ) : (
          <>
            <div className="profile-mid">
              <AccountCircleIcon className="blank" />
            </div>
            <div className="profile-bottom">
              <div className="nama">
                <p>{name}</p>
              </div>
              <div className="username">
                <p>{username}</p>
              </div>
              <div className="tanggal">
                <div className="ttl">
                  <p>Birthday : {tanggal_lahir}</p>
                </div>
                <div
                  style={{
                    borderLeft: "1px solid black",
                    height: "100%",
                    margin: "0 8px",
                  }}
                />
                <div className="join">
                  <p>Join At : {fullDate}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </ProfileContainer>
    </Layout>
  );
};

const ProfileContainer = styled.div`
  background: white;

  .profile-top div {
    display: flex;
    align-items: center;
    cursor: pointer;
    background: #025930;
    width: 10%;
    justify-content: center;
    color: white;
    padding: 5px;
    border-radius: 10px;
  }

  .profile-mid,
  .profile-bottom {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  .profile-bottom {
    flex-direction: column;
    align-items: center;
  }
  .profile-bottom > div {
    margin-bottom: 8px;
  }
  .blank {
    font-size: 120px;
  }

  .nama {
    font-size: 24px;
    text-transform: capitalize;
  }
  .username {
    color: rgb(100, 100, 100);
    font-size: 18px;
  }
  .tanggal {
    display: flex;
    height: 50px;
    padding: 10px 5px;
    align-items: center;
  }

  .not-match-params {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }
  .not-match-params p {
    font-size: 1.2rem;
  }
`;

export default Profile;
