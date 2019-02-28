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
    padding: '1rem',
    backgroundColor: 'rgba(247, 245, 245, 1)',
    marginTop: '2rem'
  },
  h5: {
    color: 'rgb(74, 123, 255)'
  }
}
