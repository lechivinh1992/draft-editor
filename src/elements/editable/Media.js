import React from 'react'
import { Entity } from 'draft-js'
import Image from './Image'

export default (props) => {
  const entity = Entity.get(props.block.getEntityAt(0))
  const { src, alt, alignment, caption } = entity.getData()
  const type = entity.getType()

  const { blockProps } = props

  let component
  if (type === 'image') {
    component = (
      <Image src={src} alignment={alignment} alt={alt} caption={caption} block={props.block} blockProps={blockProps} />
    )
  }

  return component
}
