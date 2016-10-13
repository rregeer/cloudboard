import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { queue as queueAction } from '../actions/sound-actions'
import Collection from './collection'
import Player from './player'
import { throttleAction } from '../helpers'
import { SOUND_THROTTLE } from '../constants'

import '../styles/board.scss'

function Board({ queue, collections, playingSong, secondaryMode, remoteMode, isMobileBrowser }) {
  return (
    <div>
      {(() => {
        if (remoteMode) {
          return <div className="board__remote-message">
            <i className="fa fa-cloud board__remote-icon"/> Remote mode
          </div>
        }

        return <Player playing={playingSong} remoteMode={remoteMode}/>
      })()}

      <div className="board__collections">
        {collections.map((collection, index) =>
          <Collection
            {...collection}
            key={collection.name}
            collectionKey={collection.key}
            queue={queue}
            index={index}
            secondaryMode={secondaryMode}
            remoteMode={remoteMode}
            isMobileBrowser={isMobileBrowser}
          />
        )}
      </div>
    </div>
  )
}

function mapStateToProps({ queue, sounds, collections, keys, remoteMode, isMobileBrowser }) {
  const [playing] = queue
  const { collectionKey, soundKey, secondaryMode } = keys

  return {
    playingSong: getPlayingSong(sounds, playing, collections),
    collections: markPressed(collections, collectionKey, soundKey, secondaryMode),
    secondaryMode,
    remoteMode,
    isMobileBrowser
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
  isMobileBrowser: PropTypes.bool.isRequired,
  playingSong: PropTypes.shape({
    sound: PropTypes.string,
    collection: PropTypes.string
  }),
  queue: PropTypes.func.isRequired,
  remoteMode: PropTypes.bool.isRequired,
  secondaryMode: PropTypes.bool.isRequired,
  sounds: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
