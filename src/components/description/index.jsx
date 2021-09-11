import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';

const Description = (props) => {

  const link = '/user/'+props.userid;

  return (
    <MDBCard className='col-example mt-3 shadow-4'>
        <MDBCardHeader><a href={link}>{ props.username }</a></MDBCardHeader>
            <MDBCardBody>
                <MDBCardTitle>{ props.title }</MDBCardTitle>
                <MDBCardText>{ props.description }</MDBCardText>
            </MDBCardBody>
        <MDBCardFooter className='text-muted text-center'>{ props.date }</MDBCardFooter>
    </MDBCard>
  );
}

export default Description;