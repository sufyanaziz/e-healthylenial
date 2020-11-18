import React from "react";
import Layout from "../../components/layout";

const History = props => {
  return (
    <Layout history={props.history}>
      <p>Hello from history</p>
    </Layout>
  );
};

export default History;
