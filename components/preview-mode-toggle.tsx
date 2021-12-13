import cx from 'classnames'
import { useGame } from '../hooks/use-game'

const PreviewModeToggle = () => {
  const {
    isInPreviewMode: [isInPreviewMode, setIsInPreviewMode],
  } = useGame()

  const handleClickValue = () => {
    setIsInPreviewMode(false)
  }

  const handleClickPreview = () => {
    setIsInPreviewMode(true)
  }

  return (
    <div className="p-2 flex justify-center gap-4">
      <button
        className={cx('px-4 py-2 bg-white', !isInPreviewMode && 'bg-gray-400')}
        onClick={handleClickValue}
      >
        Value
      </button>
      <button
        className={cx('px-4 py-2 bg-white', isInPreviewMode && 'bg-gray-400')}
        onClick={handleClickPreview}
      >
        Preview
      </button>
    </div>
  )
}

export default PreviewModeToggle
