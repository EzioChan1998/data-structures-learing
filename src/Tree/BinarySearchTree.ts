/**
 * 二叉搜索树（BST）
 * */

import TreeNode from "./TreeNode";
import {defaultCompare, Compare} from "../utils/index";

type CB = <T = number>(key: T) => void;

class BinarySearchTree<T = number> {

  compareFn: typeof defaultCompare<T>;
  root: TreeNode<T> | null | undefined;

  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  // 插入值
  public insert(key: T): void {
    if(this.root == null) {
      this.root = new TreeNode(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  public insertNode(node:TreeNode<T>, key:T) {
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(node.left == null) {
        node.left = new TreeNode(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if(node.right == null) {
        node.right = new TreeNode(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  // 中序遍历
  public inOrderTraverse(callback:CB) {
    this.inOrderTraverseNode(this.root, callback);
  }

  private inOrderTraverseNode(node:TreeNode<T>, callback:CB) {
    if(node != null) {
      // 先左边
      this.inOrderTraverseNode(node.left, callback);
      // 然后自己
      callback<T>(node.key);
      // 最后右边
      this.inOrderTraverseNode(node.right, callback);
      // 顺序从小到大
    }
  }

  // 先序遍历
  public preOrderTraverse(callback:CB) {
    this.preOrderTraverseNode(this.root, callback);
  }

  private preOrderTraverseNode(node:TreeNode<T>, callback:CB) {
    if(node != null) {
      // 先自己
      callback<T>(node.key);
      // 然后左边
      this.preOrderTraverseNode(node.left, callback);
      // 最后右边
      this.preOrderTraverseNode(node.right, callback);
      // 应用场景：打印一个结构化文档
    }
  }

  // 后续遍历
  public postOrderTraverse(callback:CB) {
    this.postOrderTraverNode(this.root, callback);
  }

  private postOrderTraverNode(node:TreeNode<T>, callback:CB) {
    if(node != null) {
      // 先左边
      this.postOrderTraverNode(node.left, callback);
      // 然后右边
      this.postOrderTraverNode(node.right, callback);
      // 最后自己
      callback(node.key);
      // 应用场景：目录及其子目录中所有文件所占空间的大小
    }
  }

  // 获取最小值
  public min():TreeNode<T> {
    return this.minNode(this.root);
  }

  private minNode(node:TreeNode<T>):TreeNode<T> {
    // 最小的值在树的最左节点
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  // 获取最大值
  public max():TreeNode<T> {
    return this.maxNode(this.root);
  }

  private maxNode(node: TreeNode<T>): TreeNode<T> {
    // 最大的值在树的最右节点
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  public search(key: T):boolean {
    return this.searchNode(this.root, key);
  }

  private searchNode(node: TreeNode<T>, key:T):boolean {
    if(node == null) {
      // 如果节点为空了，说明无法在树上找到这个值
      return false;
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 值比当前节点小，走左边
      return this.searchNode(node.left, key);
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 值比当前节点大，走右边
      return this.searchNode(node.right, key);
    } else {
      // 值相等返回true
      return true;
    }
  }

  public remove(key: T):void {
    this.root = this.removeNode(this.root, key);
  }

  public removeNode(node: TreeNode<T>, key: T):TreeNode<T> {
    if(node == null) {
      // 如果节点为空了，说明无法在树上找到这个值
      return null;
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // key === node.key
      // 第一种情况：该节点是叶子节点，没有子节点了
      if(node.left == null && node.right == null) {
        node = null;
        return node;
      }

      // 第二种情况，只有左子节点或者右子节点
      if(node.left == null) {
        // 左子节点为空说明只有右子节点，直接让当前节点等于右子节点
        node = node.right;
        return node;
      } else if(node.right == null) {
        // 右子节点为空说明只有左子节点，直接让当前节点等于左子节点
        node = node.left;
        return node;
      }

      // 第三种情况，该节点左右子节点都有
      // 找到右子树的最小节点(也就是比key值大的最小值)
      const aux = this.minNode(node.right);
      // 将找出来的值直接赋值给当前节点
      node.key = aux.key;
      // 因为aux的值被赋值给了当前的节点，可以直接去右边的子树删除aux节点
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }
}

export default BinarySearchTree;
