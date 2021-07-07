import { PageTitleText } from '../components/Layout'
import { Nav } from 'react-bootstrap'
import {REACT_APP_REACTLINK} from '../App'
var React = require('react');
var QRCode = require('qrcode.react');

export function QRcode(){
    return(
    <PageTitleText>
        Link to this react site : 
        <Nav.Link href={REACT_APP_REACTLINK}> {REACT_APP_REACTLINK}</Nav.Link>{'\n'}
    <QRCode value={REACT_APP_REACTLINK} />
    {'\n'}{'\n'}
    </PageTitleText>
    );
}