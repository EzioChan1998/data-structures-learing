class Node<T = number> {

  element: T;
  next: undefined | null | Node<T>;

  constructor(element: T) {
    this.element = element;
    this.next = undefined;
  }
}

export default Node;
