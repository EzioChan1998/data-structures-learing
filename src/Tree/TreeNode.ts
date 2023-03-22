class TreeNode<T = number> {
  key: T;
  left: TreeNode<T> | null | undefined;
  right: TreeNode<T> | null | undefined;
  constructor(key: T) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export default TreeNode;
