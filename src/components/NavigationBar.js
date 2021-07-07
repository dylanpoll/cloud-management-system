import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

export const Styles = styled.div`
.navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`

export const NavigationBar = () => {
  return(
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">DevDylan's IOT cloud manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto"> 
                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/apiabout">API Information</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
    )
  }
/*
retired links
                    <Nav.Item><Nav.Link href="/ledpanel">Led Control Panel</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/cam">Webcam</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/whoisHome">Who Is Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/record">Recorder</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/qrcode">QR Link</Nav.Link></Nav.Item>

*/