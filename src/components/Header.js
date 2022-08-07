import styled from "styled-components";
import React, { useLayoutEffect, useState } from "react";

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: pink;
`;

const SubTitle = styled.h3`
    text-align: right;
    color: gray;
    margin-bottom: 20px;
`;

const Header = (props) => {
    return (
        <>
            <Title>{props.title}</Title>
            <SubTitle>{props.subtitle}</SubTitle>
        </>
    );
};
export default Header;
