import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import {Form, FormControl, Button} from 'react-bootstrap'


class Searchbox extends Component {

  state = {
    "query" : ""
  };

  //when value of searchbox changes, set the state to the new value
  handleChange = e => {
    this.setState({"query": e.target.value})
  };

  //when the form is submitted prevent the page from reloading and then use the props.history
  searchSubmit = e => {
    e.preventDefault();
    console.log(this);
    this.props.history.push("/search/"+this.state.query);
  }

  //create our searchbox which has a method for capturing the value and a method that runs on submit
  render() {
    return (
      <Form inline onSubmit={this.searchSubmit}>
        <FormControl type="text" placeholder="Search for recipes" className="mr-sm-2" value={this.state.query} onChange={this.handleChange}/>
        <Button variant="outline-success" onClick={this.searchSubmit}>Search</Button>
      </Form>
    )
  }
}

export default withRouter(Searchbox);
