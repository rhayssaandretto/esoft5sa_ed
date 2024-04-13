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

  public insertNode(treeNode: TreeNode, newNode: TreeNode) {
    if (newNode.word < treeNode.word) {
      if (treeNode.leftNode === null) {
        treeNode.leftNode = newNode;
      } else {
        this.insertNode(treeNode.leftNode, newNode);
      }
    } else {
      if (treeNode.rightNode === null) {
        treeNode.rightNode = newNode;
      } else {
        this.insertNode(treeNode.rightNode, newNode);
      }
    }
    treeNode.height =
      1 +
      Math.max(
        this.calculateHeight(treeNode.leftNode),
        this.calculateHeight(treeNode.rightNode)
      );
    this.root = this.balance(this.root!);
  }

  public calculateHeight(treeNode: TreeNode | null): number {
    return treeNode ? treeNode.height : 0;
  }

  public getBalanceFactor(treeNode: TreeNode): number {
    if (treeNode == null) return 0;
    let leftHeigth =
      treeNode.leftNode != null ? this.calculateHeight(treeNode.leftNode) : 0;
    let rightHeigth =
      treeNode.rightNode != null ? this.calculateHeight(treeNode.rightNode) : 0;
    return leftHeigth - rightHeigth;
  }

  public rotateRight(treeNode: TreeNode): TreeNode | null {
    const rightNode = treeNode.rightNode;
    if (rightNode === null) {
      return null;
    }
    const newNode = rightNode;
    treeNode.rightNode = rightNode.leftNode;
    newNode.leftNode = treeNode;
    treeNode.height =
      1 +
      Math.max(
        this.calculateHeight(treeNode.leftNode),
        this.calculateHeight(treeNode.rightNode)
      );
    newNode.height =
      1 +
      Math.max(
        this.calculateHeight(newNode.leftNode),
        this.calculateHeight(newNode.rightNode)
      );
    return newNode;
  }

  public rotateLeft(treeNode: TreeNode): TreeNode | null {
    const leftNode = treeNode.leftNode;
    if (leftNode === null) {
      return null;
    }
    const newNode = leftNode;
    treeNode.leftNode = leftNode.rightNode;
    newNode.rightNode = treeNode;
    treeNode.height =
      1 +
      Math.max(
        this.calculateHeight(treeNode.leftNode),
        this.calculateHeight(treeNode.rightNode)
      );
    newNode.height =
      1 +
      Math.max(
        this.calculateHeight(newNode.leftNode),
        this.calculateHeight(newNode.rightNode)
      );
    return newNode;
  }

  public rotateLeftRight(treeNode: TreeNode): TreeNode | null {
    if (treeNode.leftNode === null) return null;
    treeNode.leftNode = this.rotateLeft(treeNode.leftNode)!;
    return this.rotateRight(treeNode)!;
  }

  public rotateRightLeft(treeNode: TreeNode): TreeNode | null {
    if (treeNode.rightNode === null) return null;
    treeNode.rightNode = this.rotateRight(treeNode.rightNode)!;
    return this.rotateLeft(treeNode)!;
  }

  public balance(treeNode: TreeNode) {
    let balancedFactor = this.getBalanceFactor(treeNode);
    if (balancedFactor < -1 && this.getBalanceFactor(treeNode.rightNode!) <= 0)
      return this.rotateLeft(treeNode);
    else if (
      balancedFactor > 1 &&
      this.getBalanceFactor(treeNode.leftNode!) >= 0
    )
      return this.rotateRight(treeNode);
    else if (balancedFactor > 1 && this.getBalanceFactor(treeNode.leftNode!) < 0)
      return this.rotateLeftRight(treeNode);
    else if (
      balancedFactor < -1 &&
      this.getBalanceFactor(treeNode.rightNode!) > 0
    )
      return this.rotateRightLeft(treeNode);

    return treeNode;
  }

  public search(word: string): string | null {
    if (!this.root) {
      return null;
    }
    return this.searchNode(this.root, word.toLowerCase());
  }

  public searchNode(treeNode: TreeNode | null, word: string): string | null {
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
