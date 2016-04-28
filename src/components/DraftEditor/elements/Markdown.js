import React from 'react'
import { Entity } from 'draft-js'
import marked from 'marked'

export default (props) => {
  const entity = Entity.get(props.block.getEntityAt(0))
  const { markdown } = entity.getData()
  console.log(entity.getData())
  return (
    <div id="content" dangerouslySetInnerHTML={{ __html: marked(markdown || '') }} />
  )
}
