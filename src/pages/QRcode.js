import { PageTitleText } from '../components/Layout'
import { Nav } from 'react-bootstrap'
import {HOST_SYSTEM,REACT_PORT} from '../App';
var React = require('react');
var QRCode = require('qrcode.react');

export function QRcode(){
    return(
    <PageTitleText>
        Link to this react site : 
        <Nav.Link href={HOST_SYSTEM+REACT_PORT}> {HOST_SYSTEM+REACT_PORT}</Nav.Link>{'\n'}
    <QRCode value={HOST_SYSTEM+REACT_PORT} />
    {'\n'}{'\n'}
    </PageTitleText>
    );
}