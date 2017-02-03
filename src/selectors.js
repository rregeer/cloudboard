export function getCollapsedCollections({ collections }) {
  return collections
    .filter(collection => collection.collapsed)
    .map(collection => collection.name)
}

export function isInLocalMode({ routing }) {
  const location = routing ? routing.locationBeforeTransitions : null
  const pathname = location ? location.pathname : ''
  return pathname.indexOf('/local') === 0
}
