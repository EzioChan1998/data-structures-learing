import TreeNode from "./TreeNode";

class BinarySearchTree {
  compareFn: any;
  root: TreeNode | null | undefined;

  constructor(compareFn) {
    this.compareFn = compareFn;
    this.root = null;
  }

  public insert(key: number): void {
    if(this.root == null) {
      this.root = new TreeNode(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  private insertNode(node:TreeNode, key:number) {

  }
}

export default BinarySearchTree;
