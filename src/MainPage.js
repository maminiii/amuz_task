import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ListItemCard from "./ListItemCard";
import { Link } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import Header from "./Header";

export const atomUserList = atom({
    key: "atomUserList",
    default: [],
});
export const atomPostList = atom({
    key: "atomPostList",
    default: [],
});

const ListItemsContainer = styled.ul`
    padding: 0;
`;

const MainPage = () => {
    //https://jsonplaceholder.typicode.com/todos
    const [users, setUsers] = useRecoilState(atomUserList);
    const [posts, setPosts] = useRecoilState(atomPostList);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/todos");

            let uniqueArr = res.data.map((item) => item.userId);
            const userList = uniqueArr.filter((el, idx) => {
                return uniqueArr.indexOf(el) === idx;
            });
            let postList = userList.map((userId) => {
                let newArr = [];
                let i = 0;
                res.data.forEach((item) => {
                    if (item.userId === userId) {
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
        } catch (e) {
            console.log("##error", e);
        }
    };

    useLayoutEffect(() => {
        fetchUsers();
    }, []);
    return (
        <>
            <Header title={"User-List"} subtitle={`Number of Users: ${users.length}`} />
            <ListItemsContainer>
                {users.map((user, idx) => {
                    return (
                        <Link to={`/postlist/${user}`} style={{ textDecoration: "none" }}>
                            <ListItemCard item={user} type="main"></ListItemCard>
                        </Link>
                    );
                })}
            </ListItemsContainer>
        </>
    );
};
export default MainPage;
