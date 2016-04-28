import React from 'react'
import Media from '../blockRenderer/elements/Media'
import { Entity } from 'draft-js'
import DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react'
import { BLOCK_TYPES } from '../../../types'

// function wrap(name) {
//   return (Component) => (props) => (
//     <div>
//       <div contentEditable={false} style={{ position: 'relative', fontSize: '1.4rem', left: '-60px' }}>{BLOCK_TYPES.filter(({ style }) => style === name)[0].label}</div>
//       <Component {...props} />
//     </div>
//   )
// }

export default function editorBlockRenderer(block) {
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

  // const component = wrap(block.getType())(DraftEditorBlock)
  return {
    component: DraftEditorBlock,
    editable: true
  }
}
