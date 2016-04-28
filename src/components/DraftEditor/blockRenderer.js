// import Html from './elements/Html'
// import Markdown from './elements/Markdown'
import Media from './elements/Media'
import { Entity } from 'draft-js'

export function blockRenderer(block) {
  if (block.getType() === 'atomic') {
    let type
    try {
      const entity = Entity.get(block.getEntityAt(0))
      type = entity.getType()
    } catch (err) {
      return null
    }
    switch (type) {
      // case 'html':
      //   return {
      //     component: Html,
      //     editable: false,
      //   }
      // case 'markdown':
      //   return {
      //     component: Markdown,
      //     editable: false,
      //   }
      default:
        return {
          component: Media,
          editable: false,
        }
    }
  }

  return null
}
