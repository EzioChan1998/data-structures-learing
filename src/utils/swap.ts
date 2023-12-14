function swap<T = any>(array:T[], a:number, b:number): void {
  [array[a], array[b]] = [array[b], array[a]];
}

export default swap;
