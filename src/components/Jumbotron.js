import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import greetavi from "../assets/greetme.jpg";

const Styles = styled.div`
.jumbo {
  object-fit: contain;
  background: #e7ad00;
  max-width: 100%;
  position: relative;
  z-index: 2;
}
.overlay {
  background-color: #000;
  opacity: 0.6;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
}
.banner {
  object-fit: scaledown;
  z-index: 4;
  max-height: 100%;
  max-width: 80%;
  top: 0;
  position: absolute;
}
.bannerText {
  z-index: 4;
  font-size: clamp(1em, 5em, 15vw);
  max-height: 100%;
  max-width: 80%;
  margin-left: 50%;
  top: 0;
}
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo mb-0">
      <div classname="overlay"> </div>
      <Container>
      <img src={greetavi} alt="banner" className = "banner"/>
      <div className = "bannerText">Hi.</div>
      </Container>
    </Jumbo>
  </Styles>
);
export default Jumbotron;
