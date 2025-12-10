import { ModalHeader } from '../../components/ModalHeader'

/**
 * @param {{
 *  onClose: () => void
 *  headerChildren: import('react').ReactNode
 *  children: import('react').ReactNode
 *  onSubmit?: () => void
 * }} props
 */
export const ModalContent = ({
  onClose,
  onSubmit,
  headerChildren,
  children
}) => {
  const WrapperTag = onSubmit ? 'form' : 'div'

  const wrapperProps = onSubmit
    ? {
        onSubmit: (e) => {
          e.preventDefault()
          onSubmit()
        }
      }
    : {}

  return (
    <div className="border-grey300-dark bg-grey500-dark relative flex max-h-[85vh] w-[420px] overflow-hidden rounded-[10px] border p-5 shadow-md">
      <WrapperTag className="flex flex-1 flex-col gap-[15px]" {...wrapperProps}>
        <ModalHeader onClose={onClose}>{headerChildren}</ModalHeader>
        <div className="flex-1 overflow-auto">{children}</div>
      </WrapperTag>
    </div>
  )
}
