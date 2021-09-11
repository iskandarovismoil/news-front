import React, { useState } from 'react';
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const Modal = (props) => {
  const [centredModal, setCentredModal] = useState(false);

  if(props.title)
    var title = "";
  else
    var title = "d-none";

  const toggleShow = () => setCentredModal(!centredModal);

  return (
    <>
      <MDBBtn onClick={toggleShow}>Vertically centered modal</MDBBtn>

      <MDBModal tabIndex='-1' show={centredModal} getOpenState={(e: any) => setCentredModal(e)}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className={ title }>
              <MDBModalTitle>{ props.title }</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              { props.children }
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default Modal;