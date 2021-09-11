import React from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBBtn } from 'mdb-react-ui-kit';

const Header = (props) => {
  return (
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
              {localStorage.getItem('userid') &&
              <MDBNavbarItem>
                <MDBNavbarLink href={'/user/'+localStorage.getItem('userid')}>Мои новости</MDBNavbarLink>
              </MDBNavbarItem>
              } 
            </MDBNavbarNav>
            {localStorage.getItem('userid') ? (
              <MDBBtn color='danger' onClick={() => {localStorage.clear(); window.location.reload();}} >Выход</MDBBtn>
            ):(
              <MDBBtn color='primary'>Вход</MDBBtn>
            )
            }
          </div>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}

export default Header;