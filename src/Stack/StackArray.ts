class Stack<T = number> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(element:T): void {
    this.items.push(element);
  }

  pop() {
    this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  clear() {
    this.items = [];
  }
}
