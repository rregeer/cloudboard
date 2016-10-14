import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { queue as queueAction } from '../actions/sound-actions'
import { toggleCollection as toggleCollectionAction } from '../actions/collection-actions'
import Collection from './collection'
import Player from './player'
import { throttleAction } from '../helpers/actions'
import { getPlayingSound, markPressed } from '../helpers/collections'
import { SOUND_THROTTLE } from '../constants'

import '../styles/board.scss'

function Board({
  collections,
  isMobileBrowser,
  playingSound,
  queue,
  remoteMode,
  secondaryMode,
  toggleCollection
}) {
  return (
    <div className={remoteMode ? 'board--remote-mode' : ''}>
      {
        remoteMode &&
        <p className="board__remote-message">
          <i className="fa fa-cloud board__remote-icon"/> Remote mode
        </p>
      }
      {
        !remoteMode &&
        <Player playing={playingSound} remoteMode={remoteMode}/>
      }
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
            toggleCollection={toggleCollection}
          />
        )}
      </div>
    </div>
  )
}

function mapStateToProps({ queue, sounds, collections, keys, remoteMode, isMobileBrowser }) {
  const { collectionKey, soundKey, secondaryMode } = keys

  return {
    playingSound: getPlayingSound(sounds, queue, collections),
    collections: markPressed(collections, collectionKey, soundKey, secondaryMode),
    secondaryMode,
    remoteMode,
    isMobileBrowser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    queue: throttleAction(queueAction, SOUND_THROTTLE),
    toggleCollection: toggleCollectionAction
  }, dispatch)
}

Board.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    sounds: PropTypes.array.isRequired
  })).isRequired,
  isMobileBrowser: PropTypes.bool.isRequired,
  playingSound: PropTypes.shape({
    sound: PropTypes.string,
    collection: PropTypes.string
  }),
  queue: PropTypes.func.isRequired,
  remoteMode: PropTypes.bool.isRequired,
  secondaryMode: PropTypes.bool.isRequired,
  toggleCollection: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
