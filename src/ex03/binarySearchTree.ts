import { TreeNode } from "./estruturas/tree.node";

export class BinarySearchTree {
  private root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  public height(node: TreeNode | null): number {
    return node ? node.height : 0;
  }

  public balanceFactor(node: TreeNode | null): number {
    if (!node) {
      return 0;
    }

    return this.height(node.leftNode) - this.height(node.rightNode);
  }

  public rotateRight(node: TreeNode) {
    const nodeOfLeft = node.leftNode;
    const rightOfLeftNode = nodeOfLeft.rightNode;

    nodeOfLeft.rightNode = node;
    node.leftNode = rightOfLeftNode;

    node.height =
      Math.max(this.height(node.leftNode), this.height(node.rightNode)) + 1;
    nodeOfLeft.height =
      Math.max(
        this.height(nodeOfLeft.leftNode),
        this.height(nodeOfLeft.rightNode)
      ) + 1;

    return nodeOfLeft;
  }

  public rotateLeft(node: TreeNode) {
    const nodeOfRight = node.rightNode;
    const leftOfRightNode = nodeOfRight.leftNode;

    nodeOfRight.leftNode = node;
    node.rightNode = leftOfRightNode;

    node.height =
      Math.max(this.height(node.leftNode), this.height(node.rightNode)) + 1;
    nodeOfRight.height =
      Math.max(
        this.height(nodeOfRight.leftNode),
        this.height(nodeOfRight.rightNode)
      ) + 1;

    return nodeOfRight;
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

    node.height =
      Math.max(this.height(node.leftNode), this.height(node.rightNode)) + 1;

    const balance = this.balanceFactor(node);

    if (balance > 1 && newNode.word < node.leftNode!.word) {
      return this.rotateRight(node);
    }

    if (balance < -1 && newNode.word > node.rightNode!.word) {
      return this.rotateLeft(node);
    }

    if (balance > 1 && newNode.word > node.leftNode!.word) {
      node.leftNode = this.rotateLeft(node.leftNode!);
      return this.rotateRight(node);
    }

    if (balance < -1 && newNode.word < node.rightNode!.word) {
      node.rightNode = this.rotateRight(node.rightNode!);
      return this.rotateLeft(node);
    }

    return node;
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
      "word",
      word,
      treeNode.word,
      word === treeNode.word.toLowerCase()
    );

    if (word === treeNode.word) {
      console.log("é igual");

      return word;
    }

    if (word < treeNode.word) {
      return this.searchNode(treeNode.leftNode, word);
    } else {
      return this.searchNode(treeNode.rightNode, word);
    }
  }
}
