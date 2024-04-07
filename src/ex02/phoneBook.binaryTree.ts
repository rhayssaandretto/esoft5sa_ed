import { Contact } from "./contact";
import { TreeNode } from "./estruturas/tree.node";

export class PhoneBookBinarySearchTree {
  public root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  public insert(contact: Contact) {
    if (!this.root) {
      this.root = new TreeNode(contact);
      // console.log(this.root);
    } else {
      this.root = this.insertNode(this.root, contact);
      // console.log("Else", this.root);
    }
  }

  public insertNode(treeNode: TreeNode | null, contact: Contact) {
    if (treeNode === null) return new TreeNode(contact);
    if (contact.name < treeNode.contact.name) {
      treeNode.leftNode = this.insertNode(treeNode.leftNode, contact);
    } else if (contact.name > treeNode.contact.name) {
      treeNode.rightNode = this.insertNode(treeNode.rightNode, contact);
    }
    treeNode.height = this.compareHeight(
      this.calculateNodeHeight(treeNode.leftNode),
      this.calculateNodeHeight(treeNode.rightNode)
    );
    return this.balance(treeNode);
  }

  public compareHeight(height1: number, height2: number): number {
    //maior
    return height1 > height2 ? height1 : height2;
  }

  public calculateNodeHeight(treeNode: TreeNode): number {
    if (treeNode === null) return -1;
    return treeNode.height;
  }

  public getBalanceFactor(treeNode: TreeNode): number {
    if (treeNode == null) return 0;
    if (treeNode)
      return (
        this.calculateNodeHeight(treeNode.leftNode) -
        this.calculateNodeHeight(treeNode.rightNode)
      );
    return 0;
  }

  public rotateLeft(treeNode: TreeNode): TreeNode | null {
    const rightNode = treeNode.rightNode; //y
    const rightLeftNode = rightNode.leftNode; //f
    rightNode.leftNode = treeNode; //r
    treeNode.rightNode = rightLeftNode; //f

    treeNode.height = this.compareHeight(
      this.calculateNodeHeight(treeNode.leftNode),
      this.calculateNodeHeight(treeNode.rightNode) + 1
    );
    rightNode.height = this.compareHeight(
      this.calculateNodeHeight(rightNode.leftNode),
      this.calculateNodeHeight(rightNode.rightNode) + 1
    );
    console.log("Fiz a rotação para esquerda");
    return rightNode;
  }

  public rotateRight(treeNode: TreeNode): TreeNode | null {
    const leftNode = treeNode.leftNode;
    const leftRightNode = leftNode.rightNode;
    leftNode.leftNode = treeNode;
    treeNode.leftNode = leftRightNode;

    treeNode.height = this.compareHeight(
      this.calculateNodeHeight(treeNode.leftNode),
      this.calculateNodeHeight(treeNode.rightNode) + 1
    );
    leftNode.height = this.compareHeight(
      this.calculateNodeHeight(leftNode.leftNode),
      this.calculateNodeHeight(leftNode.rightNode) + 1
    );
    console.log("Fiz a rotação para direita");
    return leftNode;
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

  public balance(root: TreeNode) {
    // root.height = this.compareHeight(root);
    if (this.root == null) return null;
    const getBalanceFactor = this.getBalanceFactor(root);
    if (getBalanceFactor < -1 && this.getBalanceFactor(root.rightNode) <= 0)
      return this.rotateLeft(root);
    if (getBalanceFactor > 1 && this.getBalanceFactor(root.leftNode) >= 0)
      return this.rotateRight(root);
    if (getBalanceFactor > 1 && this.getBalanceFactor(root.leftNode) < 0)
      return this.rotateLeftRight(root);
    if (getBalanceFactor < -1 && this.getBalanceFactor(root.rightNode) > 0)
      return this.rotateRightLeft(root);
    return root;
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
      root.height = this.compareHeight(
        this.calculateNodeHeight(root.leftNode),
        this.calculateNodeHeight(root.rightNode) + 1
      );
      return this.balance(root);
    }
  }

  public getRoot(): TreeNode | null {
    return this.root;
  }

  public printBalancedTree(root: TreeNode | null, level: number) {
    if (root !== null) {
      this.printBalancedTree(root.rightNode, level + 1);
      let i: number;
      for (i = 0; i < level; i++) {
        process.stdout.write("\t\t");
      }
      console.log(root.contact.name + ": " + root.contact.phoneNumber);
      this.printBalancedTree(root.leftNode, level + 1);
    } else {
      for (let i = 0; i < level; i++) {
        process.stdout.write("\t\t");
      }
      console.log("-");
    }
  }
}
