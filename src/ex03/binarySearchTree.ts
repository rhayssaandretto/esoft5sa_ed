import { TreeNode } from "./estruturas/tree.node";

export class BinarySearchTree {
  private root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  public insert(word: string): void {
    const newWordNode = new TreeNode(word.toLowerCase());

    if (!this.root) {
      this.root = newWordNode;
    } else {
      this.insertNode(this.root, newWordNode);
    }
  }

  public insertNode(treeNode: TreeNode, newTreeNode: TreeNode): void {
    if (newTreeNode.word < treeNode.word) {
      if (treeNode.leftNode) {
        treeNode.leftNode = this.insertNode(treeNode.leftNode, newTreeNode);
      }
    } else {
      if (treeNode.rightNode) {
        treeNode.rightNode = this.insertNode(treeNode.rightNode, newTreeNode);
      }
    }
  }

  public search(word: string): string | null {
    if (!this.root) {
      return null;
    }

    return this.searchNode(this.root, word.toLowerCase());
  }

  public searchNode(treeNode: TreeNode, word: string): string | null {
    if (!treeNode) {
      return null;
    }

    if (word === treeNode.word) {
      return word;
    }

    if (word < treeNode.word) {
      return this.searchNode(treeNode.leftNode, word);
    } else {
      return this.searchNode(treeNode.rightNode, word);
    }
  }
}
