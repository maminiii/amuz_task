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
`;
const ListSubItemContainer = styled.div`
    width: 50px;
    height: 100%;
    text-align: center;
    padding-right: 20px;
    color: ${(props) => props.color};
`;

const ListItemCard = (props) => {
    return (
        <>
            {props.type === "main" ? (
                <ListItem key={props.type + props.item}>
                    <ListItemContainer>{props.item}</ListItemContainer>
                </ListItem>
            ) : (
                <ListItem key={props.type + props.item.id}>
                    <ListItemContainer>{props.item.title}</ListItemContainer>
                    <ListSubItemContainer color={props.item.completed ? "blue" : "red"}>
                        {props.item.completed ? "완료" : "미완료"}
                    </ListSubItemContainer>
                </ListItem>
            )}
        </>
    );
};
export default ListItemCard;
