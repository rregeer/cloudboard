export function normalizeSounds(collections) {
  return Object.keys(collections)
    .reduce((allSounds, collectionName) => {
      const { sounds, name } = collections[collectionName]
      const collectionSounds = sounds.map(s => ({ ...s, collection: name }))
      return [...allSounds, ...collectionSounds]
    }, [])
}

export function throttleAction(action, threshhold = 2000) {
  let last

  return function run(...args) {
    const now = Number(new Date())
    if (last && now < last + threshhold) {
      return {
        ...action(...args),
        type: 'IGNORE'
      }
    }

    last = now
    return action(...args)
  }
}
