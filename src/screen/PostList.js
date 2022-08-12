import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import SimpleWithIcon from "../components/SimpleWithIcon";
import Tabs from "../components/Tabs";

import { useSelector } from "react-redux";
import {
  postsSelector,
  userPostsSelector,
} from "../store/modelDucks/PostSelectors";
import { usersSelector } from "../store/modelDucks/UserSelectors";

const PostList = () => {
  const { userId } = useParams();
  const posts = useSelector(postsSelector);
  const users = useSelector(usersSelector);
  const userPosts = useSelector((state) => userPostsSelector(state, userId));
  const [postList, setPostList] = useState([]);
  const [tabIdx, setTabIdx] = useState(0);
  const [tabs, setTabs] = useState([
    { name: "전체", current: true },
    { name: "완료", current: false },
    { name: "미완료", current: false },
  ]);

  useLayoutEffect(() => {
    setPostList(userPosts);
  }, []);

  useEffect(() => {
    switch (tabIdx) {
      case 0:
        setPostList(userPosts);
        break;
      case 1: {
        setPostList(userPosts.filter((item) => item.completed));
        break;
      }
      case 2:
        setPostList(userPosts.filter((item) => !item.completed));
        break;
    }
    setTabs((prev) => {
      let temp = [...prev];
      return temp.map((item, idx) => {
        return {
          ...item,
          current: idx === tabIdx ? true : false,
        };
      });
    });
  }, [tabIdx]);

  const handleClick = (idx) => {
    setTabIdx(idx);
  };

  return (
    <>
      {/* <Indicator /> */}
      <Header
        title={`Post-List of "${users[Number(userId) - 1].name}"`}
        subtitle={`Number of Posts: ${postList.length}`}
      />
      <Tabs handleClick={handleClick} tabs={tabs} />
      <div style={{ width: "100%", height: "20px" }}></div>
      <SimpleWithIcon postList={postList} userId={userId} />
    </>
  );
};
export default PostList;
