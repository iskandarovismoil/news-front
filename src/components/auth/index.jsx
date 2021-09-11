import React from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
  MDBBtn,
  MDBRow,
} from 'mdb-react-ui-kit';
import axios from 'axios';

class Auth extends React.Component {

  state = {
    fillActive: "tab1",
  }

  handleLogin = e => {
    e.preventDefault();

    const data = {
      email: this.email,
      password: this.password,
    }

    axios.post('login', data)
      .then(result => {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('userid', result.data.user.id);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
  };

  handleRegister = e => {
    e.preventDefault();

    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      repassword: this.repassword,
    }

    axios.post('register', data)
      .then(result => {
        console.log(result);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
  };

  handleFillClick = (value) => {
    if (value === this.state.fillActive) {
      return;
    }

    this.setState({ fillActive: value });
  };

  render() {

    return (
      <>
        <MDBTabs fill className='mb-3'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => this.handleFillClick('tab1')} active={this.state.fillActive === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => this.handleFillClick('tab2')} active={this.state.fillActive === 'tab2'}>
              Registration
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={this.state.fillActive === 'tab1'}>

              <form onSubmit={this.handleLogin} className="text-center">

                  <MDBInput label='E-mail' id='email' type='email' className="mt-4" 
                    onChange={e => this.email = e.target.value} />

                  <MDBInput label='Пароль' id='password' type='password' className="mt-4 mb-3"
                    onChange={e => this.password = e.target.value} />

                  <a href='#'>Забыл пароль ?</a>

                  <div class="d-grid gap-2 mt-3">
                      <MDBBtn size="12">Вход</MDBBtn>
                      <p className="mt-3">Не пользователь ? <a href="#" onClick={() => this.handleFillClick('tab2')} active={this.state.fillActive === 'tab2'}>Регистрация</a></p>
                  </div>

              </form>

          </MDBTabsPane>
          <MDBTabsPane show={this.state.fillActive === 'tab2'}>
              <form onSubmit={this.handleRegister}>
                  <MDBInput onChange={e => this.name = e.target.value} label='Name' id='name' type='text' className="mt-4" />
                  <MDBInput onChange={e => this.email = e.target.value} label='E-mail' id='email' type='email' className="mt-4" />
                  <MDBInput onChange={e => this.password = e.target.value} label='Password' id='password' type='password' className="mt-4" />
                  <MDBInput onChange={e => this.repassword = e.target.value} label='Re-password' id='repassword' type='password' className="mt-4" />
                  <div class="d-grid gap-2 mt-3">
                      <MDBBtn size="12">Primary</MDBBtn>
                  </div>
              </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </>
    );
  }
}

export default Auth;