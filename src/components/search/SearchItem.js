import React from 'react'
import {Link} from 'react-router-dom'

const SearchItem = (props) => {
    return(
      //from the props item, display the name and price propery
        <li className="border border-dark rounded col-md-4 m-3 p-2">
          <img src={props.item.image} alt={props.item.name}></img>
          <b>{props.item.name}</b>
          <br></br>
          <Link to={"../recipe/" + props.item.id}>Recipe Details</Link>
        </li>
    )
}

export default SearchItem
