import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import MealItem from './MealItem'


class MealList extends Component {

  state={
        "ingredients":[
        ]
  }

  displayMenu(){
    console.log(this.props.menu);
  }


  render() {
    return (
      <section>
        {this.displayMenu()}
      </section>
    )
  }
}

export default MealList
