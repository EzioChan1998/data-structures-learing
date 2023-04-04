import TreeNode from "./TreeNode";
import BinarySearchTree from "./BinarySearchTree";
import { defaultCompare, Compare } from '../utils/index';
import { BalanceFactor } from './constans';

class AVLTree<T> extends BinarySearchTree<T> {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = defaultCompare;
    this.root = null;
  }

  getNodeHeight(node: TreeNode<T>):number {
    if(node == null) {
      return -1;
    }

    return Math.max(
      this.getNodeHeight(node.left),
      this.getNodeHeight(node.right)
    ) + 1;
  }

  getBalanceFactor(node: TreeNode<T>):number {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_RIGHT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  // 左-左旋转
  public rotationLL(node: TreeNode<T>): TreeNode<T> {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  // 右右旋转
  public rotationRR(node: TreeNode<T>): TreeNode<T> {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  public rotationLR(node: TreeNode<T>): TreeNode<T> {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  public rotationRL(node: TreeNode<T>): TreeNode<T> {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }
}

export default AVLTree;
