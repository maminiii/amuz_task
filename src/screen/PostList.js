import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { atomPostList, atomUserList, atomIsLoaded } from "../data/atoms";

import Indicator from "../components/Indicator";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import SimpleWithIcon from "../components/SimpleWithIcon";

const PostList = () => {
    const { userId } = useParams();
    const [isLoaded, setIsLoaded] = useRecoilState(atomIsLoaded);
    const [posts, setPosts] = useRecoilState(atomPostList);
    const userList = useRecoilValue(atomUserList);
    const [postList, setPostList] = useState([]);
    const [tabIdx, setTabIdx] = useState(0);
    const [tabs, setTabs] = useState([
        { name: "전체", current: true },
        { name: "완료", current: false },
        { name: "미완료", current: false },
    ]);

    const fetchData = async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/todos");

            let postList = userList.map((userId) => {
                let newArr = [];
                let i = 0;
                res.data.forEach((item) => {
                    if (item.userId === userId.id) {
                        newArr.push({
                            id: item.id,
                            postId: i,
                            title: item.title,
                            completed: item.completed,
                        });
                        i++;
                    }
                });
                return newArr;
            });
            setPosts(postList);
            sessionStorage.setItem("postList", JSON.stringify(postList));

            setIsLoaded(false);
        } catch (e) {
            console.log("##error", e);
        }
    };

    useLayoutEffect(() => {
        setIsLoaded(true);
    }, []);

    useLayoutEffect(() => {
        if (isLoaded) fetchData(isLoaded);
    }, [isLoaded]);

    useLayoutEffect(() => {
        setPostList(posts[userId - 1]);
    }, [userId]);

    useEffect(() => {
        switch (tabIdx) {
            case 0:
                setPostList(posts[userId - 1]);
                break;
            case 1: {
                setPostList(posts[userId - 1].filter((item) => item.completed));
                break;
            }
            case 2:
                setPostList(posts[userId - 1].filter((item) => !item.completed));
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
            <Indicator />
            <Header
                title={`Post-List of "${userList[Number(userId) - 1].name}"`}
                subtitle={`Number of Posts: ${postList.length}`}
            />
            <Tabs handleClick={handleClick} tabs={tabs} />
            <div style={{ width: "100%", height: "20px" }}></div>
            <SimpleWithIcon postList={postList} userId={userId} />
        </>
    );
};
export default PostList;
