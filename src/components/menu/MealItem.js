import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const MealItem = (props) => {
    return(
      //from the props item, display the name and price propery
        <li>
          <img src={props.item.image} alt={props.item.name}></img>
          <h5>{props.item.name}</h5>
          <Link to={"../recipe/" + props.item.id}>Recipe Details</Link>
          <Button onClick={props.onDelete}>Remove from menu</Button>
        </li>
    )
}

export default MealItem
