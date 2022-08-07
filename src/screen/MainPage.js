import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ListItemCard from "../components/ListItemCard";
import { atomIsLoaded } from "../data/atoms";
import Indicator from "../components/Indicator";

import { atom, useRecoilState } from "recoil";
import Header from "../components/Header";
import GridList from "../components/GridList";
import { atomUserList, atomPostList, atomNeedUpdate } from "../data/atoms";

const ListItemsContainer = styled.ul`
    padding: 0;
`;

const MainPage = () => {
    //https://jsonplaceholder.typicode.com/todos
    const [users, setUsers] = useRecoilState(atomUserList);
    const [posts, setPosts] = useRecoilState(atomPostList);
    const [isLoaded, setIsLoaded] = useRecoilState(atomIsLoaded);
    const [needUpdate, setNeedUpdate] = useRecoilState(atomNeedUpdate);

    const fetchData = async () => {
        try {
            const userRes = await axios.get("https://jsonplaceholder.typicode.com/users");

            const res = await axios.get("https://jsonplaceholder.typicode.com/todos");

            const userList = userRes.data;
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
            setUsers(userList);
            setPosts(postList);
            sessionStorage.setItem("postList", JSON.stringify(postList));

            setIsLoaded(false);
            setNeedUpdate(false);
        } catch (e) {
            console.log("##error", e);
        }
    };

    useLayoutEffect(() => {
        //console.log("##needUpdate", needUpdate);
        //if (needUpdate) setIsLoaded(true);
        setIsLoaded(true);
    }, [needUpdate]);

    useLayoutEffect(() => {
        if (isLoaded) fetchData(isLoaded);
    }, [isLoaded]);

    return (
        <>
            <Indicator />
            <Header title={"User-List"} subtitle={`Number of Users: ${users.length}`} />
            <ListItemsContainer>
                {/* {users.map((user, idx) => {
                    return (
                        <Link to={`/postlist/${user.id}`} style={{ textDecoration: "none" }}>
                            <ListItemCard item={user.name} type="main"></ListItemCard>
                        </Link>
                    );
                })} */}
                <GridList people={users}></GridList>
            </ListItemsContainer>
        </>
    );
};
export default MainPage;
