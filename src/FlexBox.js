import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const direction = ({ direction }) => direction && `flex-direction: ${direction};`;

const align = ({ align }) => align && `align-items: ${align};`;
const justify = ({ justify }) => justify && `justify-content: ${justify};`;
const wrap = ({ fwrap }) => fwrap && `flex-wrap : wrap`;
const center = ({ center }) => center && `align-items: center; justify-content: center;`;

const FlexBoxContainer = styled.div`
    display: flex;
    position: relative;
    box-sizing: border-box;
    ${direction}
    ${align}
  ${justify}
  ${center}
  ${wrap}
`;

const FlexBox = React.forwardRef(({ wrap, children, ...rest }, ref) => {
    return (
        <FlexBoxContainer ref={ref} {...rest} fwrap={wrap}>
            {children}
        </FlexBoxContainer>
    );
});

FlexBox.defaultProps = {
    direction: "row",
    align: "center",
    justify: "flex-start",
    center: false,
    wrap: false,
};

FlexBox.propTypes = {
    direction: PropTypes.oneOf(["row", "column"]),
    align: PropTypes.oneOf(["flex-start", "flex-end", "center", "stretch", "baseline"]),
    justify: PropTypes.oneOf([
        "flex-start",
        "flex-end",
        "center",
        "space-around",
        "space-between",
        "space-evenly",
    ]),
    center: PropTypes.bool,
    wrap: PropTypes.bool,
};

export default FlexBox;
