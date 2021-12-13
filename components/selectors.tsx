import { ReactNode } from 'react'
import { CgClose } from 'react-icons/cg'
import cx from 'classnames'
import { useGame } from '../hooks/use-game'

type SelectorProps = {
  isDisabled?: boolean
  className?: string
  value: ReactNode
  onClick: () => void
}

const Selector = ({ isDisabled, className, value, onClick }: SelectorProps) => {
  return (
    <button
      className={cx(
        'cursor-pointer h-12 text-xl border border-gray-400 flex items-center justify-center bg-white',
        isDisabled && 'cursor-not-allowed',
        !isDisabled &&
          'hover:bg-gray-400 hover:border-gray-800 active:bg-gray-300 transition-colors',
        className,
      )}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

const Selectors = () => {
  const {
    selectedValue: [selectedValue],
    changeValue,
  } = useGame()

  const onClick = (value: string) => () => {
    if (selectedValue) {
      changeValue(selectedValue, value)
    }
  }

  const isDisabled = selectedValue === null

  return (
    <div className="selectors grid grid-cols-3 grid-rows-3 gap-2 p-2 container mx-auto">
      <Selector isDisabled={isDisabled} onClick={onClick('1')} value="1" />
      <Selector isDisabled={isDisabled} onClick={onClick('2')} value="2" />
      <Selector isDisabled={isDisabled} onClick={onClick('3')} value="3" />
      <Selector isDisabled={isDisabled} onClick={onClick('4')} value="4" />
      <Selector isDisabled={isDisabled} onClick={onClick('5')} value="5" />
      <Selector isDisabled={isDisabled} onClick={onClick('6')} value="6" />
      <Selector isDisabled={isDisabled} onClick={onClick('7')} value="7" />
      <Selector isDisabled={isDisabled} onClick={onClick('8')} value="8" />
      <Selector isDisabled={isDisabled} onClick={onClick('9')} value="9" />
      <div />
      <Selector isDisabled={isDisabled} onClick={onClick('')} value={<CgClose />} />
    </div>
  )
}

export default Selectors
