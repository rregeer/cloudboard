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
  location,
  playingSound,
  queue,
  remoteMode,
  secondaryMode,
  toggleCollection
}) {
  const localMode = location.pathname.indexOf('/local') === 0
  const hasTopMessage = remoteMode || localMode
  const hasPlayer = !(remoteMode && !localMode)

  return (
    <div className={remoteMode ? 'board--has-top-message' : ''}>
      {
        hasTopMessage &&
        <p className={'board__top-message ' + (localMode ? 'board__top-message--local' : 'board__top-message--remote')}>
          { !localMode && <i className="fa fa-cloud board__remote-icon"/> }
          { localMode ? 'Local mode' : 'Remote mode' }
        </p>
      }
      {
        hasPlayer &&
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
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
