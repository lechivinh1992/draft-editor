import React from 'react'
import { Entity } from 'draft-js'
import Image from './Image'
import Table from './Table'

export default (props) => {
  const entity = Entity.get(props.block.getEntityAt(0))
  const { src, alignment, caption, entities } = entity.getData()
  const type = entity.getType()

  let component
  if (type === 'image') {
    component = <Image src={src} alignment={alignment} caption={caption} />
  }
  if (type === 'table') {
    component = <Table entities={entities} />
  }

  return component
}
