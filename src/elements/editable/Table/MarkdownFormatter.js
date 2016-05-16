import React, { PropTypes } from 'react'
import marked from 'marked'

const MarkdownFormatter = (props) => (
  <div dangerouslySetInnerHTML={{ __html: marked(props.value ? props.value.toString() : '') }} />
)

MarkdownFormatter.propTypes = {
  value: PropTypes.any
}

export default MarkdownFormatter
