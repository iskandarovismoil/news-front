import React from 'react';
import  { Redirect } from 'react-router-dom'
import {
  MDBInput,
  MDBBtn,
  MDBCard, MDBCardBody,
} from 'mdb-react-ui-kit';

import axios from 'axios';

class Change extends React.Component {

    state = {

        config: {
            headers: {
                Authorization: "Bearer " +  localStorage.getItem('token')
            }
        },

        data: {
          success: undefined,
          errors: undefined
        }

    }

    async componentDidMount() {

        await this.getNews();
        this.onTodoChange = this.onTodoChange.bind(this)

    };

    async getNews() {

        const news = await this.axiosGet('news/'+this.props.match.params.id);
        
        if(news.data.data) {
    
            this.setState({ id: news.data.data.id, title: news.data.data.title, description: news.data.data.description, my: news.data.my, redirect: false });
    
        } else
          this.setState({ data: undefined, user: undefined, my: undefined, redirect: true });
        
          console.log(this.state);
    }

    handleChange = e => {

        e.preventDefault();

        const data = {
            title: this.state.title,
            description: this.state.description,
        }

       this.axiosPut('edit/'+this.state.id, data).then(
            result => {
              if(result.data.success)
                this.setState({ data: { success: true}})
              else
                this.setState({ data: { success: false, errors: result.data.error}})
            },
            error => {
                console.log(error);
            }
        );

    };

    async axiosGet(url) {

        var res = null;

        await axios.get(url, this.state.config).then(
            result => {
                res = result;
            },
            error => {
                console.log(error);
            }
        ).catch(
            error => {
                console.log(error);
            }
        )

        return res;

    }

    async axiosPut(url, data) {

        var res = null;
        
        await axios.put(url, data, this.state.config).then(
            result => {
                res = result;
            },
            error => {
                console.log(error);
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        )
        
        return res;
        
    }

    onTodoChange(e){
      this.setState({[e.target.name]: e.target.value});
    }



  render() {

    
    if(this.state.my == false) {
      return <Redirect to="/" push={true} />
    }

    if(this.state.data.success)
      return <Redirect to='/user/my' />

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

          <form onSubmit={this.handleChange} className="text-center">

            <MDBInput label='Название' value={this.state.title} name="title" id='title' type='text' className="mt-4" 
              onChange={e => this.onTodoChange(e)} />

            <MDBInput label='Детализация' value={ this.state.description } name="description" id='description' textarea rows={5} className="mt-4 mb-3"
              onChange={e => this.onTodoChange(e)} />

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

export default Change;