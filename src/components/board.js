import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { queue as queueAction } from '../actions/sound-actions'
import { toggleCollection as toggleCollectionAction } from '../actions/collection-actions'
import { addFavorite as addFavoriteAction, removeFavorite as removeFavoriteAction } from '../actions/favorites-actions'
import Collection from './collection'
import Player from './player'
import Favorites from './favorites'
import { throttleAction } from '../helpers/actions'
import { getPlayingSound, markStates, enhanceFavorites } from '../helpers/collections'
import { SOUND_THROTTLE } from '../constants'
import BoardTopMessage from './board-top-message'

import '../styles/board.scss'

function Board({
  addFavorite,
  collections,
  favorites,
  isMobileBrowser,
  location,
  playingSound,
  queue,
  remoteMode,
  removeFavorite,
  secondaryMode,
  toggleCollection
}) {
  const localMode = location.pathname.indexOf('/local') === 0
  const hasTopMessage = remoteMode || localMode
  const hasPlayer = !(remoteMode && !localMode)

  return (
    <div className={remoteMode ? 'board--has-top-message' : ''}>
      {hasTopMessage && <BoardTopMessage localMode={localMode}/>}
      {hasPlayer && <Player playing={playingSound} remoteMode={remoteMode}/>}
      <div className="board__collections">
        <Favorites queue={queue} favorites={favorites} removeFavorite={removeFavorite}/>
        {collections.map((collection, index) =>
          <Collection
            {...collection}
            addFavorite={addFavorite}
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

function mapStateToProps({ queue, sounds, collections, keys, favorites, remoteMode, isMobileBrowser }) {
  const { collectionKey, soundKey, secondaryMode } = keys

  return {
    playingSound: getPlayingSound(sounds, queue, collections),
    collections: markStates(collections, collectionKey, soundKey, secondaryMode, favorites),
    secondaryMode,
    remoteMode,
    favorites: enhanceFavorites(favorites, sounds),
    isMobileBrowser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    queue: throttleAction(queueAction, SOUND_THROTTLE),
    toggleCollection: toggleCollectionAction,
    addFavorite: addFavoriteAction,
    removeFavorite: removeFavoriteAction
  }, dispatch)
}

Board.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  collections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    sounds: PropTypes.array.isRequired
  })).isRequired,
  favorites: PropTypes.array.isRequired,
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
  removeFavorite: PropTypes.func.isRequired,
  secondaryMode: PropTypes.bool.isRequired,
  toggleCollection: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
