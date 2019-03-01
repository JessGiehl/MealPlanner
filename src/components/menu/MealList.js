import React, { Component } from 'react'
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
    //if there are no recipes added to the menu, display a message prompting the user to search for recipes.
    let display;
    if (this.props.menu[0].recipes.length === 0){
      display = <div className="mb-20">
                  <h5>Search for recipes and add them to your menu and they will appear here!</h5>
                </div>
    } else {
      display = <div>
                  <ul className="row justify-content-center" style={styles.ul}>{this.createMenuList()}</ul>
                  <h5>Ingredient List</h5>
                  <ul style={styles.ul}>{this.createIngredientList()}</ul>
                </div>
    }
    return (
      <section className="mt-2 ml-4 mr-4">
        <h2>Menu</h2>
        {display}
      </section>
    )
  }
}

export default MealList

const styles = {
  ul: {
    listStyleType: 'none'
  }
}
