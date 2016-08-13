export function extractSoundsFromBoards(boards) {
  return Object.keys(boards)
    .reduce((sounds, boardName) => {
      return [...sounds, ...boards[boardName].sounds]
    }, [])
}
