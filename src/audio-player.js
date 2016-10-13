const SOUND_TIMEOUT = 13000

export default function playAudio(url, onEnded) {
  let ended = false
  const audio = new Audio(url)

  audio.onended = () => {
    onEnded()
    ended = true
  }

  setTimeout(() => {
    if (!ended) {
      onEnded()
    }
  }, SOUND_TIMEOUT)

  audio.play()
}
