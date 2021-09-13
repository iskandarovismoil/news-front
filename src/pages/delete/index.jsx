import React from 'react';
import  { Redirect } from 'react-router-dom'


import axios from 'axios';

class Delete extends React.Component {

  state = {}


  componentDidMount() {

    var config = {
      headers: {
         Authorization: "Bearer " +  localStorage.getItem('token')
      }
    }

    
    axios.delete('/delete/'+this.props.match.params.id, config)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error);
      })
  };

  render() { 
    return (
      <Redirect to='/user/my' />
    );
  }
}

export default Delete;