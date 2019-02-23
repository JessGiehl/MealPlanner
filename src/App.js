import React, { Component } from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import SearchResults from './components/search/SearchResults';
import RecipeDetail from './components/recipe/RecipeDetail';
import Searchbox from './components/search/Searchbox';
import MealList from './components/menu/MealList';

//import './App.css';

class App extends Component {

  //exists for the lifetime of the app, is static until updated with setState
  state={
        "menus":[
          {
            name : "default",
            recipes : []
          }
        ],
  }

  //method to delete a pizza object from the state using the index from our menu list
  deleteItemAt(pIndex){
    console.log("deleteItemAt",pIndex)
    //create a copy of the state array
    let arr = [...this.state.mealList];
    //splice the new array it at the index of the item being deleted, delete just the one item
    arr.splice(pIndex,1);
    //set the value of the state equal to our new array
    this.setState({mealList:arr})
  }

  addItem(recipe){
    //data binding
    let menuArray = [...this.state.menus]
    let defaultMenu = menuArray[0];
    //push the recipe object to our newly created array
    defaultMenu.recipes.push(recipe);
    this.setState({menus: menuArray})
    localStorage.setItem('menuStorage', JSON.stringify(menuArray));
  }

  //renders the header, searchbox, and the footer. The main body of the page is dictated by the URL,
  //search/ and recipe/ both pass paramaters into their route components
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <section>
          <Route exact path = "/search/:query"
            component={SearchResults}/>
          <Route exact path = "/recipe/:recipeID"
            render={(routeProps) => (
              <RecipeDetail {...routeProps} addItem={(recipe) =>this.addItem(recipe)} />
            )} />
          <Route exact path = "/menu"
            render={(routeProps) => (
              <MealList {...routeProps} menu={this.state.menus} deleteItem={(i) =>this.deleteItemAt(i)} />
            )} />
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
