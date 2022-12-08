export type MakePropertyOptional<T, K extends keyof T> = Pick<Partial<T>, K> &
  Omit<T, K>;

export type MakePropertyRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};
