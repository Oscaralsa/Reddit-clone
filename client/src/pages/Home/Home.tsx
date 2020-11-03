import React, { useEffect, useState } from "react";
import { map } from "lodash";

import { getAllPostApi } from "../../api/post";
import BasicLayout from "../../layouts/BasicLayout";
import RedditPremium from "../../components/Cards/RedditPremium";
import RedditInfo from "../../components/Cards/RedditInfo";
import RedditPost from "../../components/Cards/RedditPost";

import { connect } from "react-redux";

import "./Home.scss";
import { IBasicPostData } from "../../interfaces/global_interfaces";
import { IRedditPostsProps } from "../../interfaces/props_interfaces";

function Home() {
  const [post, setPost] = useState<IBasicPostData[]>([]);

  useEffect(() => {
    getAllPostApi(1).then((response) => {
      setPost(response);
    });
  }, []);

  return (
    <BasicLayout>
      <LeftComponent post={post} />
      <RightComponent />
    </BasicLayout>
  );
}

function LeftComponent(props: IRedditPostsProps) {
  const { post } = props;
  return (
    <div className="left">
      {map(post, (post: any, index: number) => {
        return <RedditPost key={index} post={post} />;
      })}
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
