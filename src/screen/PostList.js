import styled from "styled-components";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useRecoilValue } from "recoil";
import ListItemCard from "../components/ListItemCard";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import AvatarGroupsWithAction from "../components/AvatarGroupsWithAction";
import SimpleWithIcon from "../components/SimpleWithIcon";
import { atomPostList, atomUserList } from "../data/atoms";

const FilterButton = styled.button`
    border: none;
    margin-right: 10px;
    border-radius: 30px;
    padding: 5px 8px;
    box-sizing: border-box;
    &.clicked {
        background-color: pink;
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: white;
    }
`;

const PostList = () => {
    const { userId } = useParams();
    const postTotalList = useRecoilValue(atomPostList);
    const userList = useRecoilValue(atomUserList);
    const [postList, setPostList] = useState([]);
    const [tabIdx, setTabIdx] = useState(0);
    const [tabs, setTabs] = useState([
        { name: "전체", current: true },
        { name: "완료", current: false },
        { name: "미완료", current: false },
    ]);
    useLayoutEffect(() => {
        setPostList(postTotalList[userId - 1]);
    }, [userId]);

    useEffect(() => {
        switch (tabIdx) {
            case 0:
                setPostList(postTotalList[userId - 1]);
                break;
            case 1: {
                setPostList(postTotalList[userId - 1].filter((item) => item.completed));
                break;
            }
            case 2:
                setPostList(postTotalList[userId - 1].filter((item) => !item.completed));
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
            <Header
                title={`Post-List of "${userList[Number(userId) - 1].name}"`}
                subtitle={`Number of Posts: ${postList.length}`}
            />
            <Tabs handleClick={handleClick} tabs={tabs} />
            <div style={{ width: "100%", height: "20px" }}></div>
            <SimpleWithIcon postList={postList} userId={userId} />
            {/* <AvatarGroupsWithAction postList={postList} userId={userId} /> */}
            {/* {postList.map((item) => {
                return (
                    <Link
                        to={`/postlist/${userId}/detailview/${item.id}`}
                        key={item.id}
                        style={{ textDecoration: "none" }}
                    >
                        <ListItemCard item={item} type="post"></ListItemCard>
                    </Link>
                );
            })} */}
        </>
    );
};
export default PostList;
