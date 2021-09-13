import React from 'react';
import  { Redirect } from 'react-router-dom'


import axios from 'axios';

class Delete extends React.Component {

  state = {}


  handleAdd = e => {
    e.preventDefault();

    var config = {
      headers: {
         Authorization: "Bearer " +  localStorage.getItem('token')
      }
    }

    
    axios.delete('/delete/'+this.props.match.params.id, config)
      .then(result => {
        console.log(result);
        if(result.data.success)
          this.setState({ data: { success: true, errors: false }})
        else
          this.setState({ data: { success: false, errors: [result.data.error.title, result.data.error.description ]}})
      })
      .catch(error => {
        console.log(error);
      })
  };

  render() { 
    return (
      <></>
    );
  }
}

export default Delete;