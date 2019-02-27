import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import MealItem from './MealItem'
import Ingredient from '../recipe/Ingredient'

class MealList extends Component {

  //loop through the recipe array passed down through props and create a mealItem for each element
  createMenuList(){
    let menuArray = this.props.menu[0].recipes;
    let ret = menuArray.map((e,i)=>{
      return <MealItem key={i} item={e} onDelete={()=>this.props.deleteItem(i)} />
    })

    return ret;
  }

  //loop through the recipe array passed down through props and then the nested ingredient array for every element
  //create an ingredient component for each one
  createIngredientList(){
    let menuArray = this.props.menu[0].recipes;
    let tmp = [];
    for (var i = 0; i < menuArray.length; i++) {
        let rec = menuArray[i];
      for (var j = 0; j < rec.ingredients.length; j++) {
        tmp.push(rec.ingredients[j]);
      }
    }
    return tmp.map((item,index)=>{ return <Ingredient name={item} />});
  }


  render() {
    return (
      <section>
        <h2>Menu</h2>
        <ul>{this.createMenuList()}</ul>
        <h5>Ingredient List</h5>
        <ul>{this.createIngredientList()}</ul>
      </section>
    )
  }
}

export default MealList
