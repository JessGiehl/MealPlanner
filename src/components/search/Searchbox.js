import React, { Component } from 'react'

class Searchbox extends Component {

  state = {
    "query" : ""
  };

  handleChange = e => {
    this.setState({"query": e.target.value})
  };


  render() {
    return (
      <form>
        <input type="text" value={this.state.query} onChange={this.handleChange} />
        <button onClick={(e)=>{e.preventDefault();this.props.history.push("/search/"+this.state.query)}}>Search</button>
      </form>
    )
  }
}

export default Searchbox
