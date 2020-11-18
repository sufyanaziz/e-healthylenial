import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Layout from "../../components/layout";
import { Context } from "../../context/storage";

const Dashboard = props => {
  const context = useContext(Context);
  let today = new Date();
  const [hour, setHour] = useState("");
  const [salam, setSalam] = useState("");
  const [date, setDate] = useState("");

  const { loading } = context.user;
  const { name } = context.user.details;

  useEffect(() => {
    document.title = "Dashboard - HealthyLenial";
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
    if (hour >= 0 && hour < 12) {
      setSalam("Good Morning");
    } else if (hour > 12 && hour < 16) {
      setSalam("Good Afternoon");
    } else if (hour > 16 && hour < 19) {
      setSalam("Good Afternoon");
    } else if (hour > 19 && hour < 24) {
      setSalam("Good Night");
    }
  }, [hour]);

  return (
    <Layout history={props.history}>
      <DashboardContainer>
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

        <div className="dashboard-mid"></div>
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
`;

export default Dashboard;
