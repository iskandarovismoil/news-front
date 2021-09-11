import React from "react";
import Description from "../../components/description";
import axios from "axios";

class Details extends React.Component {

  state = {
    
  }

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
      <>  
        <Description userid={ userid } username={ username } title={ title } description={ description } date={ createdDate }/>
      </>
    );
  }
}

export default Details;