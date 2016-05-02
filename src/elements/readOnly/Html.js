import React from 'react'
import { Entity } from 'draft-js'

export default (props) => {
  const entity = Entity.get(props.block.getEntityAt(0))
  const { html } = entity.getData()
  return (
    <div id="content" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
