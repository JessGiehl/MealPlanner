import React,{Component} from 'react';
import SearchItem from './SearchItem';
import LoadIndicator from '../../images/loading.gif';

class SearchResults extends Component{

    state = {
        "responseArray" : [
        ],
        "loading" : true
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

          var responseObjects = [];

          //loop through the array of responses and create an object with the information for each one
          for (var i = 0; i < myJson.matches.length; i++) {
            //remove any HTML tags and make each image secure
            let cleanName = myJson.matches[i].recipeName.replace(/<\/?[^>]+(>|$)/g, "");
            let secureImage = myJson.matches[i].imageUrlsBySize[90].replace(/^http:\/\//i, 'https://');
            responseObjects.push({
              name : cleanName,
              id : myJson.matches[i].id,
              image : secureImage
            });
        }
        //set the state with our array of responseObjects
        that.setState({responseArray: responseObjects});
        that.setState({"error": false})
        that.setState({"loading" : false})
      })
      .catch(error => that.setState({error: "true"}));
    }

    //when the query changes if it does not match the current query value, run the componentDidMount method for a new API call
    componentDidUpdate(prevProps){
      if (this.props.match.params !== prevProps.match.params){
        this.setState({"loading" : true})
        this.componentDidMount();
      }
    }

    //method that maps through our menu prop and uses the values to create list items
    generateList(){
        if (this.state.error) {
          return "Error, something went wrong.";
        } else if (!this.state.error && this.state.responseArray.length === 0){
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
      let data;
      if (this.state.loading) {
      data = <img src={LoadIndicator} alt="Loading" />
      } else {
        data =  <div>
                  <h3>Search results for {this.state.searchQuery}:</h3>
                  <ul style={styles.ul} className="row justify-content-center">{this.generateList()}</ul>
                </div>
      }
        return(
            <section className="mt-2 ml-4 mr-4">
              {data}
            </section>
        )
    }

}

export default SearchResults

const styles = {
  ul: {
    listStyleType: 'none'
  }
}
