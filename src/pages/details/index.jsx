import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';
import axios from "axios";
import  { Redirect } from 'react-router-dom'

class Details extends React.Component {

  state = {}

  async componentDidMount() {
    await this.getNews();
  }

  async getNews() {

    const news = await this.axiosGet('news/'+this.props.match.params.id);
    
    if(news.data.data) {

      const user = await this.axiosGet('user/'+news.data.data.userid);

      if(user.data.data)
        this.setState({ data: news.data.data, user: user.data.data, my: news.data.my, redirect: false });
      else
        this.setState({ data: undefined, user: undefined, my: undefined, redirect: true });

    } else
      this.setState({ data: undefined, user: undefined, my: undefined, redirect: true });

  }

  async axiosGet(url) {

    var res = null;

    const config = {
      headers: {
         Authorization: "Bearer " +  localStorage.getItem('token')
      }
    }

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

    if(this.state.redirect)
      return <Redirect to="/" push={true} />

    if(this.state.data && this.state.user){
      var id = this.state.data.id;
      var title = this.state.data.title;
      var description = this.state.data.description;
      var createdDate = this.state.data.created_at;
      var userid = this.state.user.id;
      var username = this.state.user.name;
      var my = this.state.my;

      if(my == true) {
        var user_button = <>
          <MDBBtn className='mx-2 shadow-0' color='success'>
            Изменить
          </MDBBtn>

          <MDBBtn className='mx-2 shadow-0' href={"/delete/"+id} color='danger'>
            Удалить
          </MDBBtn>
        </>;
      }
    }


    return (
      <div className="p-2">  
        <MDBCard className='col-example mt-3 shadow-4'>
          <MDBCardHeader><a href={ '/user/'+userid }>{ username }</a></MDBCardHeader>
              <MDBCardBody className="pb-2">
                  <MDBCardTitle>{ title }</MDBCardTitle>
                  <MDBCardText>{ description }</MDBCardText>
                  { user_button }
              </MDBCardBody>
          <MDBCardFooter className='text-muted text-center'>{ createdDate }</MDBCardFooter>
      </MDBCard>
      </div>
    );
  }
}

export default Details;