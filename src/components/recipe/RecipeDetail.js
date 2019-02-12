import React,{Component} from 'react';

class RecipeDetail extends Component{

  state = {
      "responseArray" : [
      ]
  }

  //Make a API call when the component mounts
  componentDidMount() {
    //variables for storing api string
    var urlStart = "http://api.yummly.com/v1/api/recipe/"
    var recipeID = "French-Onion-Soup-1858873"
    var urlEnd = "?_app_id=a18fce64&_app_key=a14d935b77f1742265befa9527b9232e"

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
    })
    .catch(error => console.error(error));
  }

    render(){
        return(
          <section>
          <p>Recipe Details</p>
          </section>
        )
    }

}

export default RecipeDetail
