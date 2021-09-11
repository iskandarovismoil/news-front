import axios from "axios";
import React from "react";
import Card from "../../components/card";

class Home extends React.Component {

  state = {}

  componentDidMount() {

      axios.get('news').then(
        result => {
          this.setState({ data: result.data })
        },
        error => {
          console.log(error);
        }
      )

  }

  render() {

    if(this.state.data)
      var cards = this.state.data.map(data => (<Card id={data.id} title={data.title} description={data.description} />));

    return (
      <>
         {cards} 
      </>
    );
  }
}

export default Home;