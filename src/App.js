import React, { useEffect, useLayoutEffect, useState } from "react";
import MainPage from "./MainPage";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import PostList from "./PostList";
import DetailView from "./DetailView";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import styled, { createGlobalStyle } from "styled-components";
import "./style.css";

const MainContainer = styled.div`
    margin: 10px 20px;
`;
const MainHeader = styled.div`
    width: 100%;
    margin: 0 auto;
    font-size: 2em;
    text-decoration: none;
    color: rgb(99, 70, 92);
`;
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
function App() {
    return (
        <div className="App">
            <RecoilRoot>
                <BrowserRouter>
                    <ScrollToTop />
                    <MainContainer>
                        <Link to={"/"} style={{ textDecoration: "none" }}>
                            <MainHeader>Home</MainHeader>
                        </Link>

                        <Routes>
                            <Route path="/" element={<MainPage />}></Route>
                            <Route path="/postlist/:userId" element={<PostList />}></Route>
                            <Route
                                path="/postlist/:userId/detailview/:itemId"
                                element={<DetailView />}
                            ></Route>
                        </Routes>
                    </MainContainer>
                </BrowserRouter>
            </RecoilRoot>
        </div>
    );
}

export default App;
