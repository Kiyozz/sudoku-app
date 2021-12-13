import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { SingleValue, Value, Values } from '../types/value.type'
import { isInvalidItem } from '../utils/is-invalid-item'

type SetState<S> = [S, Dispatch<SetStateAction<S>>]

type ContextValue = {
  values: Values[]
  isInPreviewMode: SetState<boolean>
  selectedValue: SetState<Value | null>
  changeValue: (value: Value, newValue: string) => void
}

const defaultContext: ContextValue = {
  values: [
    [
      { key: '1-1', value: '3', fixed: true },
      { key: '1-2', value: '' },
      { key: '1-3', value: '' },
      { key: '1-4', value: '4', fixed: true },
      { key: '1-5', value: '5', fixed: true },
      { key: '1-6', value: '' },
      { key: '1-7', value: '' },
      { key: '1-8', value: '' },
      { key: '1-9', value: '6', fixed: true },
    ],
    [
      { key: '2-1', value: '' },
      { key: '2-2', value: '' },
      { key: '2-3', value: '5', fixed: true },
      { key: '2-4', value: '' },
      { key: '2-5', value: '1', fixed: true },
      { key: '2-6', value: '6', fixed: true },
      { key: '2-7', value: '' },
      { key: '2-8', value: '' },
      { key: '2-9', value: '8', fixed: true },
    ],
    [
      { key: '3-1', value: '' },
      { key: '3-2', value: '' },
      { key: '3-3', value: '' },
      { key: '3-4', value: '' },
      { key: '3-5', value: '' },
      { key: '3-6', value: '' },
      { key: '3-7', value: '' },
      { key: '3-8', value: '7', fixed: true },
      { key: '3-9', value: '' },
    ],
    [
      { key: '4-1', value: '' },
      { key: '4-2', value: '' },
      { key: '4-3', value: '' },
      { key: '4-4', value: '' },
      { key: '4-5', value: '' },
      { key: '4-6', value: '1', fixed: true },
      { key: '4-7', value: '5', fixed: true },
      { key: '4-8', value: '4', fixed: true },
      { key: '4-9', value: '2', fixed: true },
    ],
    [
      { key: '5-1', value: '' },
      { key: '5-2', value: '' },
      { key: '5-3', value: '' },
      { key: '5-4', value: '6', fixed: true },
      { key: '5-5', value: '' },
      { key: '5-6', value: '2', fixed: true },
      { key: '5-7', value: '' },
      { key: '5-8', value: '' },
      { key: '5-9', value: '' },
    ],
    [
      { key: '6-1', value: '2', fixed: true },
      { key: '6-2', value: '9', fixed: true },
      { key: '6-3', value: '4', fixed: true },
      { key: '6-4', value: '8', fixed: true },
      { key: '6-5', value: '' },
      { key: '6-6', value: '' },
      { key: '6-7', value: '' },
      { key: '6-8', value: '' },
      { key: '6-9', value: '' },
    ],
    [
      { key: '7-1', value: '' },
      { key: '7-2', value: '7', fixed: true },
      { key: '7-3', value: '' },
      { key: '7-4', value: '' },
      { key: '7-5', value: '' },
      { key: '7-6', value: '' },
      { key: '7-7', value: '' },
      { key: '7-8', value: '' },
      { key: '7-9', value: '' },
    ],
    [
      { key: '8-1', value: '8', fixed: true },
      { key: '8-2', value: '' },
      { key: '8-3', value: '' },
      { key: '8-4', value: '3', fixed: true },
      { key: '8-5', value: '6', fixed: true },
      { key: '8-6', value: '' },
      { key: '8-7', value: '1', fixed: true },
      { key: '8-8', value: '' },
      { key: '8-9', value: '' },
    ],
    [
      { key: '9-1', value: '1', fixed: true },
      { key: '9-2', value: '' },
      { key: '9-3', value: '' },
      { key: '9-4', value: '' },
      { key: '9-5', value: '5', fixed: true },
      { key: '9-6', value: '2', fixed: true },
      { key: '9-7', value: '' },
      { key: '9-8', value: '' },
      { key: '9-9', value: '3', fixed: true },
    ],
  ],
  isInPreviewMode: [false, () => {}],
  selectedValue: [null, () => {}],
  changeValue: () => {},
}

const Context = createContext<ContextValue>(defaultContext)

const UseGameProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [isInPreviewMode, setInPreviewMode] = useState(false)
  const [values, setValues] = useState(defaultContext.values)
  const [selectedValue, setSelectedValue] = useState<Value | null>(null)

  const calculateNewValue = useCallback(
    (value: Value, newValue: string): SingleValue => {
      if (newValue === '') return newValue
      if (!isInPreviewMode) return newValue
      if (!value.isPreview) return [newValue]

      if (Array.isArray(value.value)) {
        return Array.from(new Set([...value.value, newValue]))
      }

      return [newValue]
    },
    [isInPreviewMode],
  )

  const changeValue = useCallback(
    (value: Value, newValue: string) => {
      setValues((valuesList) => {
        const newList = [...valuesList]

        for (let rootIndex = 0; rootIndex < valuesList.length; rootIndex++) {
          const list = valuesList[rootIndex]

          for (let index = 0; index < list.length; index++) {
            const v = list[index]
            if (v.key === value.key) {
              const effectiveNewValue = calculateNewValue(value, newValue)

              const newItem: Value = {
                key: value.key,
                value: effectiveNewValue,
                fixed: value.fixed,
                isPreview: isInPreviewMode,
              }

              newList[rootIndex][index] = newItem

              if (!isInPreviewMode && !isInvalidItem(newList[rootIndex], newItem)) {
                setSelectedValue(null)
              } else {
                setSelectedValue(newItem)
              }

              return newList
            }
          }
        }

        console.log('new', newList[0])

        return newList
      })
    },
    [calculateNewValue, isInPreviewMode],
  )

  return (
    <Context.Provider
      value={useMemo(
        () => ({
          values,
          selectedValue: [selectedValue, setSelectedValue],
          changeValue,
          isInPreviewMode: [isInPreviewMode, setInPreviewMode],
        }),
        [values, selectedValue, changeValue, isInPreviewMode],
      )}
    >
      {children}
    </Context.Provider>
  )
}

export const useGame = () => useContext(Context)

export default UseGameProvider
