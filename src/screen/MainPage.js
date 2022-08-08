import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { atomUserList, atomIsLoaded } from "../data/atoms";

import Indicator from "../components/Indicator";
import Header from "../components/Header";
import GridList from "../components/GridList";

const ListItemsContainer = styled.ul`
    padding: 0;
`;

const MainPage = () => {
    //https://jsonplaceholder.typicode.com/todos
    const [users, setUsers] = useRecoilState(atomUserList);
    const [isLoaded, setIsLoaded] = useRecoilState(atomIsLoaded);

    const fetchData = async () => {
        try {
            const userRes = await axios.get("https://jsonplaceholder.typicode.com/users");
            const userList = userRes.data;

            setUsers(userList);
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

    return (
        <>
            <Indicator />
            <Header title={"User-List"} subtitle={`Number of Users: ${users.length}`} />
            <ListItemsContainer>
                <GridList people={users}></GridList>
            </ListItemsContainer>
        </>
    );
};
export default MainPage;
