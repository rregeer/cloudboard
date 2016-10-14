import { TOGGLE_COLLECTION } from '../constants'

export const toggleCollection = name => ({
  type: TOGGLE_COLLECTION,
  name
})
