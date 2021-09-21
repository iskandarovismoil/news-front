import axios from 'axios';

class Axios {

    state = {
        headers: {
            Authorization: "Bearer " +  localStorage.getItem('token')
        }
    }

    async Get(url) {

        var res = null;

        await axios.get(url, this.state.headers).then(
            result => {
                res = result;
            },
            error => {
                console.log(error);
            }
        ).catch(
            error => {
                console.log(error);
            }
        )

        return res;

    }

  async Post(url, data) {

    var res = null;
    
    await axios.post(url, data, this.state.headers).then(
        result => {
            res = result;
        },
        error => {
            console.log(error);
        }
    )
    .catch(
        error => {
            console.log(error);
        }
    )

    return res;

  }

  
}

export default Axios;