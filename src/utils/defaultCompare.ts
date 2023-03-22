export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
}

function defaultCompare<T = number>(a:T, b: T):number {
  if(a === b) {
    return 0;
  }

  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export default defaultCompare;
