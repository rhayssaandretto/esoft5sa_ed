import { TreeNode } from "./estruturas/tree.node";

export class BinarySearchTree {
  private root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  public insert(word: string) {
    const newWordNode = new TreeNode(word.toLowerCase());

    if (!this.root) {
      this.root = newWordNode;
    } else {
      this.insertNode(this.root, newWordNode);
    }
  }

  public insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.word < node.word) {
      if (node.leftNode === null) {
        node.leftNode = newNode;
      } else {
        this.insertNode(node.leftNode, newNode);
      }
    } else {
      if (node.rightNode === null) {
        node.rightNode = newNode;
      } else {
        this.insertNode(node.rightNode, newNode);
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

    console.log(
      `Palavra a ser comparada "${word}" é igual a "${treeNode.word}"?`,
      word === treeNode.word.toLowerCase()
    );

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
