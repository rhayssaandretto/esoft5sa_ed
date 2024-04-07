import { Contact } from "./contact";
import { TreeNode } from "./estruturas/tree.node";

export class PhoneBookBinarySearchTree {
  private root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  public insert(contact: Contact) {
    if (!this.root) this.root = new TreeNode(contact);
    this.insertNode(this.root, contact);
  }

  public insertNode(treeNode: TreeNode, contact: Contact) {
    // if (treeNode === null) return new TreeNode(contact);

    if (contact.name < treeNode.contact.name) {
      if (treeNode.leftNode) {
        treeNode.leftNode = this.insertNode(treeNode.leftNode, contact);
      }
    } else {
      if (treeNode.rightNode) {
        treeNode.rightNode = this.insertNode(treeNode.rightNode, contact);
      }
    }
    treeNode.height =
      1 +
      Math.max(
        this.calculateHeight(treeNode.leftNode),
        this.calculateHeight(treeNode.rightNode)
      );
    if (this.root === null) return null;
    this.root = this.balance(this.root);
  }

  public calculateHeight(treeNode: TreeNode | null): number {
    return treeNode ? treeNode.height : 0;
  }

  public getBalanceFactor(treeNode: TreeNode): number {
    if (treeNode == null) return 0;
    let leftHeigth =
      treeNode.leftNode != null ? this.calculateHeight(treeNode.leftNode) : 0;
    let rightHeigth =
      treeNode.leftNode != null ? this.calculateHeight(treeNode.leftNode) : 0;
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
    treeNode.leftNode = this.rotateLeft(treeNode.leftNode);
    return this.rotateRight(treeNode);
  }

  public rotateRightLeft(treeNode: TreeNode): TreeNode | null {
    if (treeNode.rightNode === null) return null;
    treeNode.rightNode = this.rotateLeft(treeNode.rightNode);
    return this.rotateRight(treeNode);
  }

  public balance(treeNode: TreeNode) {
    if (treeNode.rightNode == null) return null;
    if (treeNode.leftNode == null) return null;
    if (this.root == null) return null;
    let balancedFactor = this.getBalanceFactor(treeNode);
    if (balancedFactor < -1 && this.getBalanceFactor(treeNode.rightNode) <= 0)
      this.root = this.rotateLeft(this.root);
    else if (
      balancedFactor > 1 &&
      this.getBalanceFactor(treeNode.leftNode) >= 0
    )
      this.root = this.rotateRight(this.root);
    else if (balancedFactor > 1 && this.getBalanceFactor(treeNode.leftNode) < 0)
      this.root = this.rotateLeftRight(this.root);
    else if (
      balancedFactor < -1 &&
      this.getBalanceFactor(treeNode.rightNode) > 0
    )
      this.root = this.rotateRightLeft(this.root);

    return this.root;
  }

  public removeContact(root: TreeNode, contact: Contact) {
    if (root === null) return null;
    if (contact.name === root.contact.name) {
      if (root.leftNode == null && root.rightNode == null) {
        console.log(`Elemento folha removido: ${contact.name}`);
      } else {
        if (root.leftNode != null && root.rightNode != null) {
          let aux = root.leftNode;
          while (aux.rightNode != null) aux = aux.rightNode;
          root.contact = aux.contact;
          aux.contact = contact;
          console.log(`Elemento trocado: ${contact}`);
          root.leftNode = this.removeContact(root.leftNode, contact);
        } else {
          let aux;
          if (root.leftNode) {
            aux = root.leftNode;
          } else {
            aux = root.rightNode;
          }
          console.log(`Elemento com um filho removido: ${contact}`);
          return aux;
        }
      }
    } else {
      if (contact.name < root.contact.name) {
        root.leftNode = this.removeContact(root.leftNode, contact);
      } else {
        root.rightNode = this.removeContact(root.rightNode, contact);
      }

      root.height =
        1 +
        Math.max(
          this.calculateHeight(root.leftNode),
          this.calculateHeight(root.rightNode)
        );

      root = this.balance(root) as TreeNode;
      return root;
    }
  }
}
