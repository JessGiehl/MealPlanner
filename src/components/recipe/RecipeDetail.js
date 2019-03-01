import React,{Component} from 'react';
import Ingredient from './Ingredient';
import {Button} from 'react-bootstrap';

class RecipeDetail extends Component{

  state = {
    recipe : {
      ingredients : [],
    },
    "added" : false
  }

  //Make a API call when the component mounts
  componentDidMount() {
    var that = this;
    //variables for storing api string
    var urlStart = "https://api.yummly.com/v1/api/recipe/"
    const {recipeID} = this.props.match.params
    var urlEnd = "?_app_id=a18fce64&_app_key=a14d935b77f1742265befa9527b9232e";
    console.log(recipeID);

    fetch(urlStart + recipeID + urlEnd)
      .then(function(response) {
        //turn response into a JSON object
        return response.json();
      })
      //create a recipe object containing two arrays, one for ingredients and one for flavors and push it to the state
      .then(function(myJson) {
        //remove any HTML tags and make each image secure
        let cleanName = myJson.name.replace(/<\/?[^>]+(>|$)/g, "");
        let secureImage = myJson.images[0].hostedLargeUrl.replace(/^http:\/\//i, 'https://');
        var recipe = {
          "name" : cleanName,
          "id" : recipeID,
          "image" : secureImage,
          "servings" : myJson.numberOfServings,
          "ingredients" : [],
          "flavors" : [],
          "externalURL" : myJson.source.sourceRecipeUrl
        }
        for (var i = 0; i < myJson.ingredientLines.length; i++) {
          recipe.ingredients.push(myJson.ingredientLines[i]);
        }
        for (var j = 0; j < myJson.flavors.length; j++) {
          recipe.flavors.push(myJson.flavors[j]);
        }
        that.setState({"recipe":recipe});
    })
    .catch(error => console.error(error));
  }

  //loop through our ingredients in the state and return an ingredient component for each one
  generateList(){
      let ret = this.state.recipe.ingredients.map((e,i)=>{
        return <Ingredient name={e} />
      })

      return ret;
  }

  //toggles whether and item has been added to the menu so it can't be added twice
  addItem(){
    this.setState({"added" : true})
    this.props.addItem(this.state.recipe)
  }

    //render out the recipe details using the values we set in the state
    //use the method we passed down through props to call app.js' addItem method
    render(){

      //create a variable for storing our button, once its clicked it will change to show the item has been added
      let addButton;
      if (!this.state.added) {
        addButton = <Button onClick={() => this.addItem()}>Add to Menu</Button>
      } else {
        addButton =  <Button variant="success">Added to Menu</Button>
      }

        return(
          <section className="mt-2 ml-4 mr-4">
            <h2>{this.state.recipe.name}</h2>
            <img src={this.state.recipe.image} alt={this.state.recipe.name}></img>
            <p>Number of servings: {this.state.recipe.servings} </p>
            <a href={this.state.recipe.externalURL} target="_blank" rel="noopener noreferrer">Recipe Source</a>
            <p>Ingredients:</p>
            <ul>
              {this.generateList()}
            </ul>
            {addButton}
          </section>
        )
    }

}

export default RecipeDetail
