import React from 'react'
import { Entity } from 'draft-js'
import Image from './Image'
import Table from './Table'
import Html from '../AtomicEditors/Html'

export default (props) => {
  const entity = Entity.get(props.block.getEntityAt(0))
  const { src, entities, html } = entity.getData()
  const type = entity.getType()

  let media
  if (type === 'image') {
    media = <Image src={src} />
  }
  if (type === 'table') {
    media = <Table entities={entities} />
  }
  if (type === 'html') {
    media = <Html html={html} />
  }
  // else if (type === 'image') {
  //   media = <Image src={src} />
  // } else if (type === 'video') {
  //   media = <Video src={src} />
  // }
  return media
}
