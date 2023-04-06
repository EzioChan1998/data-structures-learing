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

  public override insert(key: T):void {
    this.root = this.insertNode(this.root, key);
  }

  public override insertNode(node: TreeNode<T>, key: T): TreeNode<T> {
    if(node == null) {
      return new TreeNode(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node;
    }

    // 插入之后进行平衡
    const balanceFactor = this.getBalanceFactor(node);
    if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if(this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        this.rotationLL(node);
      } else {
        this.rotationLR(node);
      }
    }
    if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if(this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        this.rotationRR(node);
      } else {
        this.rotationRL(node);
      }
    }
  }

  public override removeNode(node: TreeNode<T>, key: T): TreeNode<T> {
    node = super.removeNode(node, key);
    if(node == null) {
      return node;
    }

    // 检测是否平衡
    const balanceFactor = this.getBalanceFactor(node);
    if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left);
      if(
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      if(balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left);
      }
    }

    if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      if(
        balanceFactorRight === BalanceFactor.BALANCED ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right);
      }
    }
    return node;
  }

}

export default AVLTree;
