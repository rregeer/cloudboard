export const QUEUE = 'QUEUE'
export const PLAY = 'PLAY'
export const STOPPED = 'STOPPED'
export const TOGGLE_COLLECTION = 'TOGGLE_COLLECTION'
export const TOGGLE_LOCAL_MODE = 'TOGGLE_LOCAL_MODE'
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const CHANGE_BOARD = 'CHANGE_BOARD'

export const COLLAPSED_COLLECTIONS_STORAGE_KEY = 'collapsedCollections'
export const FAVORITES_STORAGE_KEY = 'favorites'
export const LOCAL_MODE_STORAGE_KEY = 'localMode'

export const SOUND_THROTTLE = 500

export const favoriteKeyIndex = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
  'z', 'x', 'c', 'v', 'b', 'n', 'm'
]

export const keyCodeMap = {
  48: 0,
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z'
}
