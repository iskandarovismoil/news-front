import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter } from 'mdb-react-ui-kit';
import axios from "axios";

class Details extends React.Component {

  state = {}

  componentDidMount() {
    axios.get('news/'+this.props.match.params.id).then(
      result => {
        this.setState({ data: result.data });
        
        axios.get('user/'+result.data.userid).then(
          result => {
            this.setState({ user: result.data });
          },
          error => {
            console.log(error);
          }
        )

      },
      error => {
        console.log(error);
      }
    )
  }

  render() {

    if(this.state.data && this.state.user){
      var title = this.state.data.title;
      var description = this.state.data.description;
      var createdDate = this.state.data.created_at;
      var userid = this.state.user.id;
      var username = this.state.user.name;
    }

    return (
      <div className="p-2">  
        <MDBCard className='col-example mt-3 shadow-4'>
          <MDBCardHeader><a href={ '/user/'+userid }>{ username }</a></MDBCardHeader>
              <MDBCardBody>
                  <MDBCardTitle>{ title }</MDBCardTitle>
                  <MDBCardText>{ description }</MDBCardText>
              </MDBCardBody>
          <MDBCardFooter className='text-muted text-center'>{ createdDate }</MDBCardFooter>
      </MDBCard>
      </div>
    );
  }
}

export default Details;