import { Value, Values } from '../types/value.type'
import { isEmptyValue } from './is-empty-value'

export const isInvalidItem = (values: Values, value: Value): boolean => {
  if (isEmptyValue(value)) return false

  return values.some((v) => {
    if (isEmptyValue(v)) return false

    if (v.key === value.key) return false

    return v.value === value.value
  })
}
