import React from 'react'
import { Entity } from 'draft-js'

export default (props) => {
  const { id } = Entity.get(props.entityKey).getData()
  return (
    <span id={id}>
      {props.children}
    </span>
  )
}
