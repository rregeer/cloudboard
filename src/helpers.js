export function normalizeSounds(collections) {
  return Object.keys(collections)
    .reduce((allSounds, collectionName) => {
      const { sounds, name } = collections[collectionName]
      const collectionSounds = sounds.map(s => ({ ...s, collection: name }));
      return [...allSounds, ...collectionSounds]
    }, [])
}
