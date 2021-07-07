import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {PageTitleText} from '../components/Layout';
import {rest} from '../App';
//const fetch = require('node-fetch');
//const rest = 'http://localhost:9001';

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
export function Test() {
  const [active, setActive] = useState(types[0]);
  return (
    <PageTitleText>LED Control Panel. Currently : *updating
    <ButtonGroup>
      {types.map(type => (
        <ButtonToggle
          key={type}
          active={active === type}
          onClick={() => { LedControll(type); setActive(type); } }
        >
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
    </PageTitleText>
  );
}

export function LedControll(type){
    console.log(type);
    axios.get(rest+"/solid/"+type).then((response) => {console.log(response.data)})
}


/* 

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {PageTitleText} from '../components/Layout';
//import {rest} from '../App';
const fetch = require('node-fetch');
const rest = 'http://localhost:9001';

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
export function Test() {
    let current = get();
    console.log(current.data);
    let currentSet = types[Number(current.isSet)];
  console.log(currentSet);
  const [active, setActive] = useState(currentSet);
  return (
    <PageTitleText>LED Control Panel. Currently : {String(current)}
    <ButtonGroup>
      {types.map(type => (
        <ButtonToggle
          key={type}
          active={active === type}
          onClick={() => { LedControll(type); setActive(type); } }
        >
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
    </PageTitleText>
  );
}

async function get(req, res) {
const respond = await fetch(rest+'/solid/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
});
res.json(respond);  
}

export function LedControll(type){
    console.log(type);
    axios.get(rest+"/solid/"+type).then((response) => {console.log(response.data)})
}


*/