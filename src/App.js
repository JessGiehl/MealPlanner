import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import {browserHistory} from "react-router";
import Header from './components/Header';
import Footer from './components/Footer';
import SearchResults from './components/search/SearchResults';
import RecipeDetail from './components/recipe/RecipeDetail';
import Searchbox from './components/search/Searchbox';
//import MealList from './components/planner/MealList';

//import './App.css';

class App extends Component {

  //exists for the lifetime of the app, is static until updated with setState
  state={
        "mealList":[],
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


  render() {
    return (
      <Router>
        <div className="App">
          {/* import the header component, pass a title as a prop */}
          <Header title="Meal Planner" />
          <section>
            <Route exact path = "/"
            render={(routeProps) => (
              <Searchbox {...routeProps} searchChange={() => this.searchChange()} searchSubmit={() => this.searchSubmit()} />
            )} />

          <Route exact path = "/search/:query"
            component={SearchResults}/>


          <Route exact path = "/recipe/:recipeID"
            component={RecipeDetail}/>


          </section>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
