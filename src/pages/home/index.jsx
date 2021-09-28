import axios from "axios";
import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBCardLink, MDBPagination, MDBPaginationItem, MDBPaginationLink   } from 'mdb-react-ui-kit';
import Pagination from 'react-js-pagination';

class Home extends React.Component {

  state = {}

  async componentDidMount() {

    await this.getNewsList();

  }

  async getNewsList(page_number = 1) {
    
    await axios.get('news?page='+page_number).then(
      result => {
        this.setState({ 
          data: result.data.data, 
          current_page: result.data.current_page,
          per_page: result.data.per_page,
          total: result.data.total
        })
      },
      error => {
        console.log(error);
      }
    ) 

  }

  render() {

    if(this.state.data) {

      var cards = this.state.data.map(data => (
        <MDBCol size='12' sm="6" md='4' xl="3" className='col-example mt-3 shadow-4'>
            <MDBCard className="hover-shadow">
                <MDBCardBody>
                    <MDBCardTitle className="text-dark card-title">{ data.title }</MDBCardTitle>
                    <MDBCardText className="text-body card-description">
                    { data.description }
                    </MDBCardText>
                    <MDBCardLink href={ '/details/'+data.id } className="float-left position-absolute bottom-0 end-0 m-2">Подробнее...</MDBCardLink>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
      ));

      var activePage = this.state.current_page;
      var total = this.state.total;
      var per_page = this.state.per_page;
      
      if(total > per_page) {
        var pagination = (
          <div className="col-12 d-flex justify-content-center mt-4">
            <Pagination
              activePage={activePage}
              totalItemsCount={total}
              itemsCountPerPage={per_page}
              onChange={(page_number) => this.getNewsList(page_number)}
              itemClass="page-item p-1"
              linkClass="page-link"
            />
           </div>
        )
      }
      
    }

    return (
      <>
         {cards}
         {pagination}
      </>
    );
  }
}

export default Home;