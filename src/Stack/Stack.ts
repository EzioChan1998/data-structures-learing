class Stack<T = number> {
  items: Record<number, T>;
  count: number;

  constructor() {
    this.items = {};
    this.count = 0;
  }

  public push(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  public pop() {
    if(this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  public peek() {
    if(this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  public size() {
    return this.count;
  }

  public isEmpty() {
    return this.size() === 0;
  }

  public clear() {
    this.items = {};
    this.count = 0;
  }

  toString() {
    if(this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

export default Stack;
