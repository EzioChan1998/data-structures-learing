class TreeNode {
  key: number;
  left: TreeNode | null | undefined;
  right: TreeNode | null | undefined;
  constructor(key: number) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export default TreeNode;
