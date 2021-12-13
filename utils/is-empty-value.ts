import { Value } from '../types/value.type'

export const isEmptyValue = (value: Value): boolean => {
  return value.value === ''
}
