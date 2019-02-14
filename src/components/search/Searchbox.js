import React, { Component } from 'react'

class Searchbox extends Component {


  render() {
    return (
      <form>
        <input type="text" onChange={this.props.searchChange} />
        <button onClick={this.props.searchSubmit}>Search</button>
      </form>
    )
  }
}

export default Searchbox
