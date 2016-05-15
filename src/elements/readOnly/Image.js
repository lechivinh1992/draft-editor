import React from 'react'

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    maxWidth: '100%',
  },
}

export default (props) => (
  <div>
    <img src={props.src} style={styles.media} alt={props.caption} />
    <p>{props.caption}</p>
    <p>{props.alignment}</p>
  </div>
)
