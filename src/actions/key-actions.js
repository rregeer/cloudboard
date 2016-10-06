import { PRESS, RELEASE } from '../constants'

export const press = key => ({
  type: PRESS,
  key
})

export const release = key => ({
  type: RELEASE,
  key
})
