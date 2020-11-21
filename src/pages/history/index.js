import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/layout";
import { Context } from "../../context/storage";
import LoadingComponent from "../../components/loading";
import Category from "../../components/todolist/Category";
import htmr from "htmr";

import styled from "styled-components";

const History = props => {
  const context = useContext(Context);

  const { getAllKategori, kategori } = context;

  useEffect(() => {
    document.title = "Report - HealthyLenial";
    getAllKategori();
  }, []);
  console.log("Welcome to Report Page 🔥");

  return (
    <Layout history={props.history}>
      <HistoryContainer>
        {kategori.loading ? (
          <LoadingComponent type="linear" />
        ) : (
          <>
            <div className="history-card">
              <h2>Report (Coming Soon)</h2>
            </div>
            <div className="history-card">
              <h4>Category : </h4>
              <div className="history-category-container">
                {kategori.all_kategori
                  .sort((a, b) => (a.nama_kategori > b.nama_kategori ? 1 : -1))
                  .map((value, index) => {
                    return (
                      <Category
                        key={index}
                        data={value}
                        className="history-category-list"
                        onClick={() => alert("you are impatient! 😆")}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="history-card">
              <h3 style={{ margin: 10 }}>
                Stay tuned, we prepared something cool for you 😎!
              </h3>
            </div>
          </>
        )}
      </HistoryContainer>
    </Layout>
  );
};

const HistoryContainer = styled.div`
  height: 95vh;
  display: flex;
  flex-direction: column;

  .history-card {
    background: white;
    box-shadow: 0 0 4px black;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  .history-card:nth-child(2) {
    overflow-x: auto;
    display: flex;
    align-items: center;
  }
  .history-card:nth-child(3) {
    flex: 1;
    padding: 0;
    overflow-y: auto;
  }

  .history-category-container {
    display: flex;
    flex: 1;
    margin-left: 10px;
  }
  .history-category-list {
    display: flex;
    background: white;
    box-shadow: 0 0 4px black;
    border-radius: 10px;
    padding: 5px 10px;
    margin-right: 8px;
    text-transform: capitalize;
    align-items: center;
    cursor: pointer;
  }
  .history-category-list:hover {
    background: rgb(230, 230, 230);
  }
  .history-category-list .icon {
    margin-right: 5px;
  }
`;

export default History;
