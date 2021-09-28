import React from 'react';
import  { Redirect } from 'react-router-dom'
import {
  MDBInput,
  MDBBtn,
  MDBCard, MDBCardBody,
} from 'mdb-react-ui-kit';


import axios from 'axios';

class Add extends React.Component {

  state = {
    data: {
      success: undefined,
      errors: undefined
    }
  }


  handleAdd = e => {
    e.preventDefault();

    const data = {
      title: this.title,
      description: this.description,
    }

    var config = {
      headers: {
         Authorization: "Bearer " +  localStorage.getItem('token')
      }
    }

    
    axios.post('add/', data, config)
      .then(result => {
        if(result.data.success)
          this.setState({ data: { success: true, errors: false }})
        else
          this.setState({ data: { success: false, errors: result.data.error}})

      })
      .catch(error => {
        console.log(error);
      })
  };

  render() {

    if(this.state.data.success)
      return <Redirect to='/user/my' />
       
    if (localStorage.getItem('token') == null) {
      return <Redirect to="/" push={true} />
    }
    return (
      <div className="p-2">
      <MDBCard className='col-example mt-3 shadow-4 bg-white col-12 col-sm-8 col-md-6 mx-auto'>
        <MDBCardBody>
          
          { this.state.data.errors &&
            <ul className="bg-danger rounded">
              { this.state.data.errors.title &&
                <li>{ this.state.data.errors.title }</li>
              }
              { this.state.data.errors.description &&
                <li>{ this.state.data.errors.description }</li>
              }
            </ul>
          }

          <form onSubmit={this.handleAdd} className="text-center">

            <MDBInput label='Название' id='title' type='text' className="mt-4" 
              onChange={e => this.title = e.target.value} />

            <MDBInput label='Детализация' id='description' textarea rows={5} className="mt-4 mb-3"
              onChange={e => this.description = e.target.value} />


            <div className="d-grid gap-2 mt-3">
              <MDBBtn size="12">Создать</MDBBtn>
            </div>

          </form>

        </MDBCardBody>
      </MDBCard>
      </div>
    );
  }
}

export default Add;