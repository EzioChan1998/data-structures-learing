class Node {

  element: any;
  next: undefined | null | Node;

  constructor(element: any) {
    this.element = element;
    this.next = undefined;
  }
}

export default Node;
