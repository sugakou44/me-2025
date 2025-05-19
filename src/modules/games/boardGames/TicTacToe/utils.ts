import { UPPERCASE_LETTERS } from '@/lib/constants/list'

export function getNotation(
  currentPlayer: 'X' | 'O',
  position: ArrayAsVector2,
  dimension: ArrayAsVector2,
) {
  return `${currentPlayer}${UPPERCASE_LETTERS[position[0]]}${dimension[1] - position[1]}`
}
