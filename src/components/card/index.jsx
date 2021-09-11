import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBCardLink   } from 'mdb-react-ui-kit';

const Card = (props) => {

  const link = '/details/'+props.id;

  return (
    <MDBCol size='12' sm="6" md='4' xl="3" className='col-example mt-3 shadow-4'>
        <MDBCard className="hover-shadow">
            <MDBCardBody>
                <MDBCardTitle className="text-dark" tag="strong">{ props.title }</MDBCardTitle>
                <MDBCardText className="text-body">
                { props.description }
                </MDBCardText>
                <MDBCardLink href={link} className="float-left position-absolute bottom-0 end-0 m-2">Подробнее...</MDBCardLink>
            </MDBCardBody>
        </MDBCard>
    </MDBCol>
  );
}

export default Card;