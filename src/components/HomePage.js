import React,{Component} from 'react';
import Searchbox from './search/Searchbox';
import SearchItem from './search/SearchItem';
import Background from '../images/splash.png'

class HomePage extends Component{

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
      })
      .catch(error => console.error(error));
    }

    componentDidUpdate(prevProps){
      if (this.props.match.params !== prevProps.match.params){
        this.componentDidMount();
      }
    }

    //method that maps through our menu prop and uses the values to create list items
    generateList(){
        let ret = this.state.responseArray.map((e,i)=>{
          //console.log(e);
          return <SearchItem key={i} item={e} />
        })

        return ret;
    }

    render(){
        return(
            <section>
              <div style={styles.bg} class="mb-2">
                <h2>Find Recipes</h2>
                <h2>Plan Meals</h2>
                <h2>Create Shopping Lists</h2>
                <Searchbox />
              </div>
              <div className="row justify-content-center">
                <h5 className="justify-content-center">Or get started with these top rated recipes!</h5>
                {/* call the generateList function and output it in an unordered list */}
                <ul className="row justify-content-center" style={styles.ul}>{this.generateList()}</ul>
              </div>
            </section>
        )
    }

}

export default HomePage

const styles = {
  bg: {
    height: '100%',
    backgroundImage: 'url('+ Background +')',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'rgb(47, 47, 47)',
    padding: '1rem'
  },
  ul: {
    listStyleType: 'none'
  }
}
