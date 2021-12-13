import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { DEFAULT_VALUE } from '../constants/default-value.constant'
import { EMPTY_GAME } from '../constants/games.constant'
import { Game, SingleValue, Value } from '../types/value.type'
import { isEmptyValue } from '../utils/is-empty-value'
import { isInvalidItem } from '../utils/is-invalid-item'

type SetState<S> = [S, Dispatch<SetStateAction<S>>]

type ContextValue = {
  values: Game
  isInPreviewMode: SetState<boolean>
  selectedValue: SetState<Value | null>
  changeValue: (value: Value, newValue: string) => void
  isSetupNewGame: SetState<boolean>
  emptyGame: () => void
  setupNewGame: () => void
}

const defaultContext: ContextValue = {
  values: EMPTY_GAME,
  isInPreviewMode: [false, () => {}],
  selectedValue: [null, () => {}],
  changeValue: () => {},
  isSetupNewGame: [false, () => {}],
  emptyGame: () => {},
  setupNewGame: () => {},
}

const Context = createContext<ContextValue>(defaultContext)

const UseGameProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [isInPreviewMode, setInPreviewMode] = useState(false)
  const [values, setValues] = useState(defaultContext.values)
  const [selectedValue, setSelectedValue] = useState<Value | null>(null)
  const [isSetupNewGame, setSetupNewGame] = useState(false)

  const calculateNewValue = useCallback(
    (value: Value, newValue: string): SingleValue => {
      if (newValue === DEFAULT_VALUE) return newValue
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
        const newList: Game = [...valuesList]

        for (let rootIndex = 0; rootIndex < newList.length; rootIndex++) {
          const list = newList[rootIndex]

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

        return newList
      })
    },
    [calculateNewValue, isInPreviewMode],
  )

  useEffect(() => {
    setSelectedValue(null)
  }, [isSetupNewGame])

  const emptyGame = useCallback(() => {
    setValues((values) => {
      return values.map((list) => {
        return list.map((value) => {
          return {
            key: value.key,
            value: '',
            fixed: false,
            isPreview: false,
          }
        })
      }) as Game
    })
  }, [])

  const setupNewGame = useCallback(() => {
    setValues((values) => {
      return values.map((list) => {
        return list.map((value) => {
          return {
            key: value.key,
            value: value.value,
            fixed: !isEmptyValue(value),
            isPreview: false,
          }
        })
      }) as Game
    })
  }, [])

  return (
    <Context.Provider
      value={useMemo(
        () => ({
          values,
          selectedValue: [selectedValue, setSelectedValue],
          changeValue,
          isInPreviewMode: [isInPreviewMode, setInPreviewMode],
          isSetupNewGame: [isSetupNewGame, setSetupNewGame],
          emptyGame,
          setupNewGame,
        }),
        [
          values,
          selectedValue,
          changeValue,
          isInPreviewMode,
          isSetupNewGame,
          emptyGame,
          setupNewGame,
        ],
      )}
    >
      {children}
    </Context.Provider>
  )
}

export const useGame = () => useContext(Context)

export default UseGameProvider
