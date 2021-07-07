import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {PageTitleText} from '../components/Layout';
import {REACT_APP_REST} from '../App';

const Button = styled.button`
background-color: black;
color: white;
font-size: 20px;
padding: 10px 60px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
`;
const ButtonToggle = styled(Button)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  background-color: black;
  width:  100%;
  margin: 0 auto;
  padding: 5%;
  padding-top: 50px;
  flex: 1;
  z-index: 1;
`;
const types = ['white', 'red', 'yello','blue','green','purple','off'];
// 0 white,1 red,2 yello,3 blue,4 green,5 purple,6 off
export function LedControll() {
  const [active, setActive] = useState(types[0]);
  return (
    <PageTitleText>LED Control Panel. Currently : *updating
    <ButtonGroup>
      {types.map(type => (
        <ButtonToggle
          key={type}
          active={active === type}
          onClick={() => { LedController(type); setActive(type); } }
        >
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
    </PageTitleText>
  );
}

export function LedController(type){
    console.log(type);
    axios.get(REACT_APP_REST+"/solid/"+type).then((response) => {console.log(response.data)})
}
