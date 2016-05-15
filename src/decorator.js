import { CompositeDecorator, Entity } from 'draft-js'
import Link from './elements/readOnly/Link'
import LinkTo from './elements/readOnly/LinkTo'

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType().toLowerCase() === 'link'
      )
    },
    callback
  )
}

function findLinkToEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType().toLowerCase() === 'link-to'
      )
    },
    callback
  )
}

export default new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
  {
    strategy: findLinkToEntities,
    component: LinkTo,
  },
])
