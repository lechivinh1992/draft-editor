import React from 'react'
import { DraftEditorBlock } from 'draft-js'

export default (props) => {
  console.log(props)
  return (
    <DraftEditorBlock {...props} />
  )
}
