import React,{Component} from 'react';
import SearchItem from './SearchItem';

class SearchResults extends Component{

    state = {
        "responseArray" : [
        ]
    }

    //Make a API call when the component mounts
    componentDidMount() {
      //variables for storing api string
      var url= "http://api.yummly.com/v1/api/recipes?_app_id=a18fce64&_app_key=a14d935b77f1742265befa9527b9232e&requirePictures=true&q=";
      var queryString = this.props.query;
      var that = this;  // old school hack from Sean.  Blame him.
      fetch(url + queryString)
        .then(function(response) {
          //turn response into a JSON object
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);

          var responseObjects = [];

          for (var i = 0; i < myJson.matches.length; i++) {
            responseObjects.push({
              name : myJson.matches[i].recipeName,
              id : myJson.matches[i].id,
              image : myJson.matches[i].imageUrlsBySize[90]
            });
          }
          console.log(this);
          that.setState({responseArray: responseObjects});
      })
      .catch(error => console.error(error));
    }


    //method that maps through our menu prop and uses the values to create list items
    generateList(){
        let ret = this.state.responseArray.map((e,i)=>{
            console.log(e);
            return <SearchItem key={i} item={e} />
        })

        return ret;
    }

    render(){
        return(
            <section>
                <h3>Search results for {this.props.query}:</h3>
                {/* call the generateList function and output it in an unordered list */}
                <ul>{this.generateList()}</ul>
            </section>
        )
    }

}

export default SearchResults
