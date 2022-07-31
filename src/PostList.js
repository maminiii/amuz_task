import styled from "styled-components";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { atomUserList, atomPostList } from "./MainPage";
import { useRecoilValue } from "recoil";
import ListItemCard from "./ListItemCard";
import Header from "./Header";

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
    const [postList, setPostList] = useState([]);
    const [tabIdx, setTabIdx] = useState(0);
    const buttonList = ["전체", "완료", "미완료"];
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
    }, [tabIdx]);

    const handleClick = (e) => {
        setTabIdx(Number(e.target.id));
    };

    return (
        <>
            <Header
                title={`Post-List of ${userId}`}
                subtitle={`Number of Posts: ${postList.length}`}
            />
            {buttonList.map((item, idx) => {
                return (
                    <FilterButton
                        onClick={handleClick}
                        id={idx}
                        className={tabIdx === idx ? "clicked" : ""}
                    >
                        {item}
                    </FilterButton>
                );
            })}

            {postList.map((item) => {
                return (
                    <Link
                        to={`/postlist/${userId}/detailview/${item.id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <ListItemCard item={item} type="post"></ListItemCard>
                    </Link>
                );
            })}
        </>
    );
};
export default PostList;
