import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const MealItem = (props) => {
    return(
      //use the props to pass down the properties or each element and a reference to the app.js method for deletion in the button
        <li class="border border-dark rounded col-md-4 m-3 p-2">
          <img style={styles.img} src={props.item.image} alt={props.item.name}></img>
          <h5>{props.item.name}</h5>
          <Link to={"../recipe/" + props.item.id}>Recipe Details</Link>
          <br></br>
          <Button variant="danger" onClick={props.onDelete}>Remove from menu</Button>
        </li>
    )
}

export default MealItem

const styles = {
  img: {
    maxWidth: "100%"
  }
}
