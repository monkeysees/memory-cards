function assertUnreachable(x: never): never {
  throw Error(`Should not get here. Provided value: ${x}`)
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export { assertUnreachable }
export type { DeepPartial }
