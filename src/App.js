import React, { Component } from "react";
import { Layout, Table } from "./components/Layout"; //this keeps everything center
import { Jumbotron } from "./components/Jumbotron";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {LedControll} from "./pages/ledControl"; // 404 
import { NoMatch } from "./pages/NoMatch"; 
import { NavigationBar } from "./components/NavigationBar"; 
import {APIinfo} from "./pages/APIinformation"; 
import {Play } from "./pages/player";  
import { Person } from "./pages/whoIsHome"; 
import {QRcode} from './pages/QRcode'; 
import {Home} from './pages/Home'; 

export const { REACT_APP_REST,REACT_APP_ESP_IP,REACT_APP_ESP2_IP,REACT_APP_WEBCAM1,REACT_APP_REACTLINK } = process.env;


class App extends Component {
  render() {
    return (
      <div className="d-flex flex-column h-100"> 
        <Router>
        <NavigationBar />
          <Jumbotron />
          <Layout>
            <Table>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/apiabout" component={APIinfo} />
                <Route exact path="/cam" component={Play} />
                <Route exact path="/whoisHome" component={Person} />
                <Route exact path="/qrcode" component={QRcode} />
                <Route exact path="/ledpanel" component={LedControll} />
                <Route component={NoMatch} />
              </Switch>
            </Table>
          </Layout>
        </Router>
        </div>
    );
  }
}
export default App;

/*
//import {Test} from './pages/Newledcontroller';
//                <Route exact path="/test" component={Test} />

import {Record} from './pages/Notification';
                <Route exact path="/record" component={Record} />
*/