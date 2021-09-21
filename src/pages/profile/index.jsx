import axios from "axios";
import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBCardLink   } from 'mdb-react-ui-kit';
import Pagination from 'react-js-pagination';

class Profile extends React.Component {

  state = {}

  async componentDidMount() {

   await this.getNewsList();

  }

  async getNewsList(page_number = 1) {

    if(this.props.match.params.userid == 'my' && localStorage.getItem('token')) {

      const user_news = await this.axiosGet('/my?page='+page_number);

      this.setState({ 
        data: user_news.data.data, 
        current_page: user_news.data.current_page,
        per_page: user_news.data.per_page,
        total: user_news.data.total
      })

      console.log(user_news);
      /*axios.get('/my', config).then(
        result => {
            this.setState({ data: result.data });
            this.setState({ user: true });
        },
        error => {
          console.log(error);
        }
      )*/

    } else {

      const user_news = await this.axiosGet('news/'+this.props.match.params.userid+'/all?page='+page_number);

      this.setState({ 
        data: user_news.data.data, 
        current_page: user_news.data.current_page,
        per_page: user_news.data.per_page,
        total: user_news.data.total
      })
      /*axios.get().then(
        result => {
            this.setState({ data: result.data });
            this.setState({ user: false });
        },
        error => {
          console.log(error);
        }
      )*/

    }  

  }

  async axiosGet(url) {

    const config = {
      headers: {
         Authorization: "Bearer " +  localStorage.getItem('token')
      }
    }

    var res = null;

    await axios.get(url, config).then(
      result => {
        res = result;
      },
      error => {
        console.log(error);
      }
    )

    return res;

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
      
      var activePage = this.state.current_page;
      var total = this.state.total;
      var per_page = this.state.per_page;

    }

    return (
      <>
         {cards}

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
      </>
    );
  }
}

export default Profile;