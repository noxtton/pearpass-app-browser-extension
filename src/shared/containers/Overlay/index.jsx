import { BASE_TRANSITION_DURATION } from '../../../shared/constants/transitions'
import { useAnimatedVisibility } from '../../../shared/hooks/useAnimatedVisibility'

/**
 * @param {{
 *  isOpen: boolean
 *  onClick: () => void
 *  type?: 'default' | 'blur'
 * }} props
 */
export const Overlay = ({ isOpen, onClick, type = 'default' }) => {
  const { isShown, isRendered } = useAnimatedVisibility({
    isOpen,
    transitionDuration: BASE_TRANSITION_DURATION
  })

  if (!isRendered) {
    return null
  }

  const baseClasses =
    'fixed inset-0 w-full h-full transition-opacity duration-300'
  const opacity = isShown ? 'opacity-100' : 'opacity-0'
  const background =
    type === 'blur'
      ? 'bg-black/50 backdrop-blur-sm'
      : 'bg-[rgba(35,35,35,0.6)] backdrop-none'

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${opacity} ${background} z-5`}
    />
  )
}
