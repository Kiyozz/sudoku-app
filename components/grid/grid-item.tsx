import cx from 'classnames'
import { MouseEvent } from 'react'

type Props = {
  text: string | string[]
  className?: string
  isInvalid?: boolean
  isSelected?: boolean
  isFixed?: boolean
  isPreview?: boolean
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void
}

const GridItem = ({
  text,
  className,
  onClick,
  isInvalid = false,
  isSelected = false,
  isFixed = false,
  isPreview = false,
}: Props) => {
  return (
    <button
      className={cx(
        'curser-pointer border border-gray-400 flex items-center justify-center text-4xl grid-item',
        isPreview && 'text-3xl',
        isInvalid && 'bg-red-500',
        isSelected && !isInvalid && 'bg-green-400 hover:bg-green-400',
        isSelected && isInvalid && 'bg-red-200 hover:bg-red-200',
        !isSelected && !isInvalid && 'bg-white',
        isFixed && 'font-bold cursor-default',
        !isFixed && 'hover:bg-gray-200 hover:border-gray-800 active:bg-gray-300 transition-colors',
        className,
      )}
      onClick={onClick}
    >
      {isPreview ? (
        <div className="relative text-sm -top-3 sm:-top-4 lg:-top-5">
          {Array.isArray(text) ? text.join(', ') : text}
        </div>
      ) : (
        text
      )}
    </button>
  )
}

export default GridItem
