import { CheckIcon } from '../../shared/icons/CheckIcon'
import { DeleteIcon } from '../../shared/icons/DeleteIcon'
import { MoveToIcon } from '../../shared/icons/MoveToIcon'
import { StarIcon } from '../../shared/icons/StarIcon'

/**
 * @type {Record<string, import('react').ElementType>}
 */
export const RECORD_ACTION_ICON_BY_TYPE = {
  select: CheckIcon,
  favorite: StarIcon,
  move: MoveToIcon,
  delete: DeleteIcon,
  autofill: CheckIcon
}
