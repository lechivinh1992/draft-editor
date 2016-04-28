import { CompositeDecorator, Entity } from 'draft-js'
import Link from 'components/DraftEditor/blockRenderer/elements/Link'

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

export default new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
])
