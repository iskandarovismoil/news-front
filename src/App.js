import React from "react";
import './App.css';
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import Header from './components/header/';
import Footer from "./components/footer/";
import Modal from "./components/modal/";
import Auth from "./components/auth/";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/home/";
import Details from "./pages/details/";
import Profile from "./pages/profile/";

class App extends React.Component {

  state = {
    
  }

  render() {
    return (
      <>
        <Router>

          <ul class="background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <Header/>

          <MDBContainer breakpoint="xxl" className="pt-5 pb-5">
            <MDBRow>
              <Modal><Auth/></Modal>
              <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route path="/user/:userid" component={Profile} />
                <Route path="/details/:id" component={Details}/>
              </Switch>
            </MDBRow>
          </MDBContainer>

          {/*<Footer/>*/}

        </Router>
      </>
    );
  }
}

export default App;
