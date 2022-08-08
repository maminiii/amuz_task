import styled from "styled-components";
import React, { useLayoutEffect, useState } from "react";

const ListItem = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    border: 1px solid gray;
    border-radius: 30px;
    margin: 20px 0;
    padding: 2px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border: 3px solid pink;
        padding: 0;
    }
`;
const ListItemContainer = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    color: black;
    padding: 4px 8px;
    font-size: 0.65em;
`;

const ListItemCard = (props) => {
    return (
        <>
            <ListItem key={props.type + props.item}>
                <ListItemContainer>{props.item}</ListItemContainer>
            </ListItem>
        </>
    );
};
export default ListItemCard;
