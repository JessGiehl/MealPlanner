import React from 'react'

const Footer = (props) => {
    return(
        <footer style={styles.footer}>
            <h5 style={styles.h5}>©2019 Jessica Giehl, wd5.</h5>
        </footer>
    )
}

export default Footer

const styles = {
  footer: {
    padding: '1px',
    backgroundColor: 'rgba(9, 117, 33, 1)',
    marginTop: '1rem'
  },
  h5: {
    color: 'white'
  }
}
