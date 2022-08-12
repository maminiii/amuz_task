import React from "react";
import styled from "styled-components";

import GridList from "../components/GridList";
import Header from "../components/Header";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/index";
import { usersSelector } from "../store/modelDucks/UserSelectors";

const ListItemsContainer = styled.ul`
  padding: 0;
`;

const MainPage = () => {
  const users = useSelector(usersSelector);

  const { num } = useSelector((state) => state.numReducer);
  const dispatch = useDispatch();
  const onAdd = () => dispatch(add());

  return (
    <>
      {/* <Indicator /> */}
      {/* <div onClick={onAdd}>{num}</div> */}
      <Header
        title={"User-List"}
        subtitle={`Number of Users: ${users.length}`}
      />
      <ListItemsContainer>
        <GridList people={users}></GridList>
      </ListItemsContainer>
    </>
  );
};
export default MainPage;
