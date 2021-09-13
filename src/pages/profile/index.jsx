import axios from "axios";
import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBCardLink   } from 'mdb-react-ui-kit';

class Profile extends React.Component {

  state = {}

  componentDidMount() {


    if(this.props.match.params.userid == 'my' && localStorage.getItem('token')) {

      var config = {
        headers: {
           Authorization: "Bearer " +  localStorage.getItem('token')
        }
      }
  
      axios.get('/my', config).then(
        result => {
            this.setState({ data: result.data });
            this.setState({ user: true });
        },
        error => {
          console.log(error);
        }
      )

    } else {

      axios.get('news/'+this.props.match.params.userid+'/all').then(
        result => {
            this.setState({ data: result.data });
            this.setState({ user: false });
        },
        error => {
          console.log(error);
        }
      )

    }  

  }

  render() {

    if(this.state.data) {

      var cards = this.state.data.map(data => (
        <MDBCol size='12' sm="6" md='4' xl="3" className='col-example mt-3 shadow-4'>
            <MDBCard className="hover-shadow">
                <MDBCardBody>
                    <MDBCardTitle className="text-dark" tag="strong">{ data.title }</MDBCardTitle>
                    <MDBCardText className="text-body">
                    { data.description }
                    </MDBCardText>
                    {this.state.user &&
                      <MDBCardLink href={ '/delete/'+data.id } className="float-right end-0 m-2">Удалить</MDBCardLink>
                    }
                    <MDBCardLink href={ '/details/'+data.id } className="float-left position-absolute bottom-0 end-0 m-2">Подробнее...</MDBCardLink>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
      ));
      
    }

    return (
      <>
         {cards} 
      </>
    );
  }
}

export default Profile;