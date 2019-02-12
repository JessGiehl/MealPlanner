import React from 'react'

const SearchItem = (props) => {
    return(
      //from the props item, display the name and price propery
        <li>
          <img src={props.item.image}></img>
          <b>{props.item.name}</b>
          <a href="./search/">Recipe Details</a>
        </li>
    )
}

export default SearchItem
