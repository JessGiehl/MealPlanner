import React from 'react'
import {Link} from 'react-router-dom'

const MealItem = (props) => {
    return(
      //from the props item, display the name and price propery
        <li>
          <img src={props.item.image} alt={props.item.name}></img>
          <b>{props.item.name}</b>
          <Link to={"../recipe/" + props.item.id}>Recipe Details</Link>
        </li>
    )
}

export default MealItem
