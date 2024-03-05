import React from "react";
import Layout from "../components/Layout";
import BottomNavbar from "../components/BottomNavbar";
import Card from "../components/Card";
import PrimaryTitle from "../components/PrimaryTitle";
import classes from "./IntructionsPage.module.css";
import List from "../components/List";

const InstructionsPage = () => {
  return (
    <Layout>
      <Card>
        <PrimaryTitle title="Instructions!" />
        <List listItems={["You will be given a selection of envelopes!","You have three opportunities to open the different envelopes.","Some envelopes contain prizes, while others do not."]} />
      </Card>
      <BottomNavbar />
    </Layout>
  );
};

export default InstructionsPage;
