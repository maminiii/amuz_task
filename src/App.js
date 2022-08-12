import React, { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { RecoilRoot } from "recoil";

import DetailView from "./screen/DetailView";
import MainPage from "./screen/MainPage";
import PostList from "./screen/PostList";

import styled from "styled-components";
import "./style.css";

import { Provider } from "react-redux";
import store from "./store";

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
        <Provider store={store}>
          {/* <Container /> */}
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
        </Provider>
      </RecoilRoot>
    </div>
  );
}

export default App;
