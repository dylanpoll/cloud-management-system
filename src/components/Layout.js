import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import background from '../assets/1oiryi.jpg'

const TableColor = styled.div`
  background-color: black;
  width:  100%;
  margin: 0 auto;
  padding: 5%;
  padding-top: 50px;
  flex: 1;
  z-index: 1;
`;
export const Layout = (props) => (
  <Container className="flex-column d-flex flex-grow-1">
    {props.children}
  </Container>
);
export const Table = (props) => (
  <TableColor>
    <div>{props.children}</div>
  </TableColor>
);
export const NotFound = styled.div`
    background: url(${background}) no-repeat;
    background-size: 100% 100%;
    position: relative;
    z-index: -1;
    min-height: 100%;
    min-width: 1024px;
    margin-top: 5%;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
`;
export const Indent = styled.div`
  width:  90%;
  margin: 0 auto;
`;
export const SmallText = styled.div`
    white-Space : pre-wrap;
    font-size: clamp(.5em, 1em, 5vw);
    color : #efefef;
`;
export const HeaderText = styled.div`
    white-Space : pre-wrap;
    font-size: clamp(1em, 1.5em, 10vw);
    color : #efefef;
`;
export const PageTitleText = styled.div`
    text-align : center;
    white-Space : pre-wrap;
    font-size: clamp(2em, 2em, 15vw);
    color : #efefef;
`;//clamp(MIN, VAL, MAX) To use clamp() enter three values: a minimum value, ideal value (from which to calculate), and maximum value.
//The max() function selects the largest value from a list of comma-separated expressions.
//min(1rem, 50%, 10vw), the browser calculates which of these relative units is the smallest, and uses that value as the actual value.