import {defaultEquals} from '../utils';
import Node from './Node';

class LinkList {
  private count: number;
  public head: undefined | null | Node;
  private equalsFn: typeof defaultEquals;
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  public push(element: any): void {
    const node = new Node(element);
    let current: Node;
    // 如果链表为空设置头节点
    if(this.head == null) {
      this.head = node;
    } else {
      // 找到为节点并添加
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      // 将新的node链接到链尾
      current.next = node;
    }
    this.count++;
  }

  public removeAt(index: number): Node | undefined {
    // 检查是否越界
    if(index >= 0 && index < this.count) {
      let current:Node = this.head;

      // 移除第一项
      if(index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current;
    }

    return undefined;
  }

  public getElementAt(index: number): Node | undefined {
    if(index >= 0 && index < this.count) {
      let node = this.head;
      for(let i = 0;i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }

    return undefined;
  }

  public insert(element: any, index: number): boolean {
    if(index >= 0 && index < this.count) {
      const node = new Node(element);
      if(index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        // 前节点
        const previous = this.getElementAt(index - 1);
        // 后节点
        const current = previous.next;
        // 链接后节点
        node.next = current;
        // 链接前节点
        previous.next = node;
      }

      this.count++;
      return true;
    }
    return false;
  }

  public indexOf(element: any): number {
    let current = this.head;
    for(let i = 0; i < this.count && current != null; i++) {
      if(this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }

    return -1;
  }

  public remove(element): Node {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  size(): number {
    return this.count;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public getHead(): Node | null | undefined {
    return this.head;
  }

  public toString(): string {
    if(this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for(let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString}${current.element}`;
      current = current.next;
    }
    return objString;
  }
}

export default LinkList;
