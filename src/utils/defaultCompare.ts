export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
} as const;

function defaultCompare<T = number>(a:T, b: T) {
  if(a === b) {
    return 0 as const;
  }

  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export default defaultCompare;
