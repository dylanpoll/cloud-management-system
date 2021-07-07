import {LedControll} from "./ledControl";
import {Play } from "./player";  
import { Person } from "./whoIsHome"; 
import {QRcode} from './QRcode'; 
import { Container } from "react-bootstrap"; 

export const Home = () => (
    <Container className="flex-column d-flex flex-grow-1">
        <LedControll/>
        <Person/>
        <Play/>
        <QRcode/>
    </Container>
);