export function extractSoundsFromCollections(collections) {
  return Object.keys(collections)
    .reduce((sounds, collectionName) => {
      const collectionSounds = collections[collectionName].sounds;
      return [...sounds, ...collectionSounds]
    }, [])
}
