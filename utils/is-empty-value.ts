import { DEFAULT_VALUE } from '../constants/default-value.constant'
import { Value } from '../types/value.type'

export const isEmptyValue = (value: Value): boolean => {
  return value.value === DEFAULT_VALUE
}
