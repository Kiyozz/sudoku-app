export type SingleValue = string | string[]
export type Value = { key: string; value: SingleValue; fixed?: boolean; isPreview?: boolean }
export type Values = [Value, Value, Value, Value, Value, Value, Value, Value, Value]
export type Game = [Values, Values, Values, Values, Values, Values, Values, Values, Values]
