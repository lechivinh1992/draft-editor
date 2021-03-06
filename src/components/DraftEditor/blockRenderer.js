import { Entity } from 'draft-js'
import DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react'
import Media from '../../elements/editable/Media'
import Html from '../../elements/readOnly/Html'
import Table from '../../elements/editable/Table'
import Markdown from '../../elements/readOnly/Markdown'

export default function blockRenderer(block, props) {
  if (block.getType() === 'atomic') {
    let type
    try {
      const entity = Entity.get(block.getEntityAt(0))
      type = entity.getType()
    } catch (err) {
      return null
    }
    switch (type) {
      case 'html':
        return {
          component: Html,
          editable: false,
        }
      case 'markdown':
        return {
          component: Markdown,
          editable: false,
        }
      case 'table':
        return {
          component: Table,
          editable: false,
          props
        }
      default:
        return {
          component: Media,
          editable: false,
          props
        }
    }
  }

  return {
    component: DraftEditorBlock,
  }
}
