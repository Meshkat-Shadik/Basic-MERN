import React, { Component } from "react";
import { Container, Input, Button ,ListGroup, ListGroupItem,Modal,ModalBody,ModalHeader} from "reactstrap";
import axios from "axios";
import cors from 'cors';
import moment from 'moment';

class App extends Component {
  state = {
    title: '',
    body:'',
    post:[],
    btn:false
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = (event) => {
    event.preventDefault();

    const datas = {
      title: this.state.title,
      body: this.state.body,
    };

    axios({
       url: "api/save",
      //url: "/api/save",
      method: 'POST',
      data: datas,
    })
      .then(() => {
        console.log("Data has been sent to the server!!");
        this.resetBoxes();
        this.getFromDb();
      })
      .catch((e) => {
        console.log("Internal Server Error occurred!! ", e);
      });
  };


  resetBoxes = ()=>
{
    this.setState(
        {
            title:'',
            body:''
        }
    )
}

componentDidMount=()=>
{
    this.getFromDb();
    
}


getFromDb = ()=>
{
    axios.get('/api/name')
    .then((res)=>
    {
        const datae = res.data;
        this.setState({post:datae});
        console.log("Data retrieved!! ");
        console.log(this.state.post)
       // this.display(this.state.post)
       
    })
    .catch((e) => {
        console.log("Error retrieving data!! ", e);
      });
}


display = ({post}) =>
{
  //  if(!(Object.keys(post).length)) return null;

 let x =  (post).map((data,index)=>
    (
        
        <ListGroupItem key={index} className="mx-3  bg-light my-1">
        <h4 className="d-flex">{data.title}</h4>

        <p className="my-3 d-flex">{data.body}</p>
        </ListGroupItem>
    ));
    return x
}






handleBtn = () =>
{
    this.setState({btn:!this.state.btn})
    this.display(this.state)
}

  render() {
    return (
      <Container className="text-center">
        <h2 className="display-4 text-info my-4"><u>Basic MERN App</u></h2>
        <form className="form-input" onSubmit={this.submit}>
          <Input
            type="text"
            name="title"
            value={this.state.title}
            placeholder="Enter title here"
            onChange={this.handleChange}
            required=""
          />

          <Input
            className="my-2"
            type="textarea"
            cols="30"
            rows="10"
            name="body"
            placeholder="Enter body here"
            onChange={this.handleChange}
            value={this.state.body}
            required=""
          />
          <Button color="success" className="form-control mb-1">
            Create
          </Button>
        </form>
     
        {/* <Button color="warning" 
        className="form-control my-2"
        onClick={this.handleBtn}
        >
            Show Data
        </Button> */}

            { this.display(this.state)}
      </Container>
    );
  }
}

export default App;
