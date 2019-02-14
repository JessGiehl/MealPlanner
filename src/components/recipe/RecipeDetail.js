import React,{Component} from 'react';
import Ingredient from './Ingredient';

class RecipeDetail extends Component{

  state = {
    recipe : {
      ingredients : [],
    }
  }

  //Make a API call when the component mounts
  componentDidMount() {
    var that = this;
    //variables for storing api string
    var urlStart = "http://api.yummly.com/v1/api/recipe/"
    const {recipeID} = this.props.match.params
    var urlEnd = "?_app_id=a18fce64&_app_key=a14d935b77f1742265befa9527b9232e";
    console.log(recipeID);

    fetch(urlStart + recipeID + urlEnd)
      .then(function(response) {
        //turn response into a JSON object
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        var recipe = {
          "name" : myJson.name,
          "image" : myJson.images[0].hostedLargeUrl,
          "servings" : myJson.numberOfServings,
          "ingredients" : [],
          "externalURL" : myJson.source.sourceRecipeUrl
        }
        for (var i = 0; i < myJson.ingredientLines.length; i++) {
          recipe.ingredients.push(myJson.ingredientLines[i]);
        }
        console.log(recipe);
        that.setState({"recipe":recipe});
        console.log(that.state.recipe.ingredients);
    })
    .catch(error => console.error(error));
  }

  generateList(){
      let ret = this.state.recipe.ingredients.map((e,i)=>{
        return <Ingredient name={e} />
      })

      return ret;
  }

    render(){
        return(
          <section>
          <h2>{this.state.recipe.name}</h2>
          <img src={this.state.recipe.image}></img>
          <p>Number of servings: {this.state.recipe.servings} </p>
          <a href={this.state.recipe.externalURL}>Recipe Source</a>
          <p>Ingredients:</p>
          <ul>
            {this.generateList()}
          </ul>
          </section>
        )
    }

}

export default RecipeDetail
