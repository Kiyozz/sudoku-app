import cx from 'classnames'
import { MouseEvent } from 'react'
import { useGame } from '../../hooks/use-game'
import { Values } from '../../types/value.type'
import { isInvalidItem } from '../../utils/is-invalid-item'
import GridItem from './grid-item'

type Props = {
  borders?: {
    top?: boolean
    right?: boolean
    bottom?: boolean
    left?: boolean
  }
  values: Values
}

const Square = ({
  borders: { top = true, left = true, bottom = true, right = true } = {},
  values,
}: Props) => {
  const {
    selectedValue: [selectedValue, setSelectedValue],
  } = useGame()

  return (
    <div
      className={cx(
        'square border-black',
        top && 'border-t-4',
        right && 'border-r-4',
        bottom && 'border-b-4',
        left && 'border-l-4',
      )}
    >
      {values.map((value) => {
        const isSelected = selectedValue?.key === value.key
        const isInvalid = isInvalidItem(values, value)
        const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
          evt.currentTarget.blur()

          if (!value.fixed) {
            setSelectedValue(value)
          }
        }

        return (
          <GridItem
            key={value.key}
            isInvalid={isInvalid}
            isSelected={isSelected}
            isFixed={value.fixed}
            isPreview={value.isPreview}
            onClick={handleClick}
            text={value.value}
          />
        )
      })}
    </div>
  )
}

export default Square
