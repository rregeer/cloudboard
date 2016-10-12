const SOUND_TIMEOUT = 13000

function createAudioPlayer(slots = 100) {
  let audioSlots = createAudioSlots(slots)

  function unlock() {
    const unlockSound = new Audio('sounds/unlock.mp3')

    audioSlots.forEach(slot => {
      slot.audio.play()
    })

    unlockSound.play()
  }

  function play(url, onEnded) {
    const { id, audio } = audioSlots.find(slot => !slot.taken) || {}

    if (!audio) {
      return
    }

    audioSlots = updateSlotAvailability(audioSlots, id, true)

    playAudio(audio, url, () => {
      audioSlots = updateSlotAvailability(audioSlots, id, true)
      onEnded()
    })
  }

  function playAudio(audio, url, onEnded) {
    let ended = false

    audio.src = url
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

  return {
    unlock,
    play
  }
}

function updateSlotAvailability(audioSlots, id, taken) {
  return audioSlots.map(slot => {
    if (slot.id !== id) {
      return slot
    }

    return { ...slot, taken }
  })
}

function createAudioSlots(amount) {
  let audioSlots = []

  for (let id = 0; id < amount; id += 1) {
    const audioSlot = {
      audio: new Audio('./sounds/blank.m4a'),
      taken: false,
      id
    }

    audioSlots = [...audioSlots, audioSlot]
  }

  return audioSlots
}

export default createAudioPlayer
