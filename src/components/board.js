import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { queue as queueAction } from '../actions/sound-actions'
import Collection from './collection'
import Player from './player'
import { throttleAction, parseKeys } from '../helpers'
import { SOUND_THROTTLE } from '../constants'

function Board({ queue, collections, playingSong, secondaryMode }) {
  return (
    <div>
      <Player playing={playingSong}/>
      <div className="board__collections">
        {collections.map((collection, index) =>
          <Collection
            {...collection}
            key={collection.name}
            collectionKey={collection.key}
            queue={queue}
            index={index}
            secondaryMode={secondaryMode}
          />
        )}
      </div>
    </div>
  )
}

function mapStateToProps({ queue, sounds, collections, keys }) {
  const [playing] = queue
  const { collectionKey, soundKey, isSecondary } = parseKeys(keys)

  return {
    playingSong: getPlayingSong(sounds, playing, collections),
    collections: markPressed(collections, collectionKey, soundKey, isSecondary),
    secondaryMode: isSecondary
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    queue: throttleAction(queueAction, SOUND_THROTTLE)
  }, dispatch)
}

function getPlayingSong(sounds, playing, collections) {
  if (!playing) {
    return null
  }

  const { title: sound } = sounds.find(s => s.name === playing.sound) || {}
  const { title: collection } = collections.find(c => c.name === playing.collection) || {}

  return { sound, collection }
}

function markPressed(collections, collectionKey, soundKey, secondaryMode) {
  return collections.map(collection => {
    const pressed = collection.key === collectionKey
    return {
      ...collection,
      pressed,
      sounds: markPressedSounds(collection.sounds, soundKey, secondaryMode, pressed)
    }
  })
}

function markPressedSounds(sounds, soundKey, secondaryMode, collectionPressed) {
  return sounds.map(sound => ({
    ...sound,
    pressed:
      collectionPressed &&
      sound.key === soundKey &&
      secondaryMode === sound.isSecondary
  }))
}

Board.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    sounds: PropTypes.array.isRequired
  })).isRequired,
  playingSong: PropTypes.shape({
    sound: PropTypes.string,
    collection: PropTypes.string
  }),
  queue: PropTypes.func.isRequired,
  secondaryMode: PropTypes.bool.isRequired,
  sounds: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
