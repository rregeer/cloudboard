import { CHANGE_BOARD } from '../constants'

export const changeBoard = board => ({
  type: CHANGE_BOARD,
  board
})
