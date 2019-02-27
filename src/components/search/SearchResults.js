import React,{Component} from 'react';
import SearchItem from './SearchItem';

class SearchResults extends Component{

    state = {
        "responseArray" : [
        ]
    }

    //Make a API call when the component mounts
    componentDidMount() {
      let that = this;
      //variables for storing api string
      var url= "https://api.yummly.com/v1/api/recipes?_app_id=a18fce64&_app_key=a14d935b77f1742265befa9527b9232e&requirePictures=true&q=";
      //use the prop parameters to get the search query string from the URL
      var {query} = this.props.match.params;
      this.setState({"searchQuery" : query})

      fetch(url + query)
        .then(function(response) {
          //turn response into a JSON object
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);

          var responseObjects = [];

          //loop through the array of responses and create an object with the information for each one
          for (var i = 0; i < myJson.matches.length; i++) {
            responseObjects.push({
              name : myJson.matches[i].recipeName,
              id : myJson.matches[i].id,
              image : myJson.matches[i].imageUrlsBySize[90]
            });
        }
        //set the state with our array of responseObjects
        that.setState({responseArray: responseObjects});
        that.setState({error: "false"})
      })
      .catch(error => that.setState({error: "true"}));
    }

    //when the query changes if it does not match the current query value, run the componentDidMount method for a new API call
    componentDidUpdate(prevProps){
      if (this.props.match.params !== prevProps.match.params){
        this.componentDidMount();
      }
    }

    //method that maps through our menu prop and uses the values to create list items
    generateList(){
        if (this.state.error == "true") {
          return "Error, something went wrong.";
        } else if (this.state.error != false && this.state.responseArray.length == 0){
          return "No search results were found.";
        } else {
          let ret = this.state.responseArray.map((e,i)=>{
            //console.log(e);
            return <SearchItem key={i} item={e} />
          })
          return ret;
        }
    }

    render(){
        return(
            <section>
              <h3>Search results for {this.state.searchQuery}:</h3>
              {/* call the generateList function and output it in an unordered list */}
              <ul>{this.generateList()}</ul>
            </section>
        )
    }

}

export default SearchResults
