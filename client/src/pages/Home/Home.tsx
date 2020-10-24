import React from "react";

import BasicLayout from "../../layouts/BasicLayout";
import RedditPremium from "../../components/Cards/RedditPremium";
import RedditInfo from "../../components/Cards/RedditInfo";
import RedditPost from "../../components/Cards/RedditPost"

import { connect } from "react-redux";

import "./Home.scss";

function Home(props: any) {
  console.log(props);
  if (props.user.user_name) {
    console.log("Logeado");
  }
  return (
    <BasicLayout>
      <LeftComponent />
      <RightComponent />
    </BasicLayout>
  );
}

function LeftComponent() {
  return (
    <div className="left">
      <RedditPost />
    </div>
  );
}

function RightComponent() {
  return (
    <div className="right-component">
      <RedditPremium />
      <RedditInfo />
    </div>
  );
}

const mapStateToProps = (state: { user: any; token: string }, props: any) => ({
  ...props,
  user: state.user,
  token: state.token,
});

export default connect(mapStateToProps)(Home);
