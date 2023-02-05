export type MakePropertyOptional<T, K extends keyof T> = Pick<Partial<T>, K> &
  Omit<T, K>;

export type MakePropertyRequired<T, K extends keyof T> = Pick<Required<T>, K> &
  Omit<T, K>;
