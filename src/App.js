import React from "react";
import './App.css';

import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBRow } from 'mdb-react-ui-kit';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/home/";
import Details from "./pages/details/";
import Profile from "./pages/profile/";
import Auth from "./pages/auth/";
import Add from "./pages/add/";
import Delete from "./pages/delete/";

class App extends React.Component {

  state = {
    
  }

  render() {
    return (
      <>
        <Router>

          <ul className="background">
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

          <header className="fixed-top header">
            <MDBNavbar expand='lg' light>
              <MDBContainer fluid>
                <MDBNavbarToggler
                  aria-controls='navbarExample01'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <MDBIcon fas icon='bars' />
                </MDBNavbarToggler>
                <div className='collapse navbar-collapse' id='navbarExample01'>
                  <MDBNavbarNav right className='mb-2 mb-lg-0'>
                    <MDBNavbarItem active>
                      <MDBNavbarLink aria-current='page' href='/'>
                        Главная
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                    {localStorage.getItem('token') &&
                    <>
                    <MDBNavbarItem>
                      <MDBNavbarLink href={'/user/my'}>Мои новости</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href={'/add'}>Добавить</MDBNavbarLink>
                    </MDBNavbarItem>
                    </>
                    } 
                  </MDBNavbarNav>
                  {localStorage.getItem('token') ? (
                    <MDBBtn color='danger' onClick={() => {localStorage.clear(); window.location.reload();}} >Выход</MDBBtn>
                  ):(
                    <MDBBtn color='primary' href="/auth">Вход</MDBBtn>
                  )
                  }
                </div>
              </MDBContainer>
            </MDBNavbar>
          </header>

          <MDBContainer breakpoint="xxl" className="pt-5 pb-5">
            <MDBRow>
              <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route exact path="/auth">
                  <Auth/>
                </Route>
                <Route path="/user/:userid" component={Profile} />
                <Route path="/details/:id" component={Details}/>
                <Route path="/add" component={Add} />
                <Route path="/delete/:id" component={Delete} />
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
