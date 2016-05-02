import styles from './styles/BlockStyles.scss'

export default function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return styles.blockquote
    case 'paragraph':
      return styles.paragraph
    case 'call-to-action':
      return styles.callToAction
    case 'note':
      return styles.note
    case 'small':
      return styles.small
    default:
      return null
  }
}
