import { Contact } from "./contact";
import { TreeNode } from "./estruturas/tree.node";

export class PhoneBookBinarySearchTree {
  public root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  public insert(contact: Contact) {
    this.root
      ? (this.root = this.insertNode(this.root, contact))
      : (this.root = new TreeNode(contact));
  }

  public insertNode(root: TreeNode | null, contact: Contact) {
    if (root === null) return new TreeNode(contact);

    if (contact.name < root.contact.name) {
      root.leftNode = this.insertNode(root.leftNode, contact);
    } else if (contact.name > root.contact.name) {
      root.rightNode = this.insertNode(root.rightNode, contact);
    } else {
      console.log("Contato já existe");
      return root;
    }

    const leftHeight = root.leftNode ? root.leftNode.height : 0;
    const rightHeight = root.rightNode ? root.rightNode.height : 0;
    root.height = Math.max(leftHeight, rightHeight) + 1;
    const balanceFactor = this.getBalanceFactor(root);
    console.log("Fator de balanceamento: ", balanceFactor);
    return this.balance(root);
  }

  public compareHeight(height1: number, height2: number): number {
    //maior
    return height1 > height2 ? height1 : height2;
  }

  public calculateNodeHeight(treeNode: TreeNode): [number, number] {
    if (treeNode === null) return [0, 0];

    const leftHeight = treeNode.leftNode ? treeNode.leftNode.height : 0;
    const rightHeight = treeNode.rightNode ? treeNode.rightNode.height : 0;

    return [leftHeight, rightHeight];
  }

  public getBalanceFactor(treeNode: TreeNode): number {
    if (treeNode == null) return -1;
    const [leftHeight, rightHeight] = this.calculateNodeHeight(treeNode);
    const balanceFactor = leftHeight - rightHeight;

    return balanceFactor;
  }

  public rotateLeft(treeNode: TreeNode): TreeNode | null {
    const rightNode = treeNode.rightNode;
    const rightLeftNode = rightNode.leftNode;
    rightNode.leftNode = treeNode;
    treeNode.rightNode = rightLeftNode;

    const leftHeight = treeNode.leftNode ? treeNode.leftNode.height : 0;
    const rightHeight = treeNode.rightNode ? treeNode.rightNode.height : 0;
    treeNode.height = Math.max(leftHeight, rightHeight) + 1;

    const leftHeightR = rightNode.leftNode ? rightNode.leftNode.height : 0;
    const rightHeightR = rightNode.rightNode ? rightNode.rightNode.height : 0;
    rightNode.height = Math.max(leftHeightR, rightHeightR) + 1;

    console.log("Fiz a rotação para esquerda");
    return rightNode;
  }

  public rotateRight(treeNode: TreeNode): TreeNode | null {
    const leftNode = treeNode.leftNode;
    const leftRightNode = leftNode.rightNode;
    leftNode.rightNode = treeNode;
    treeNode.leftNode = leftRightNode;

    const leftHeight = treeNode.leftNode ? treeNode.leftNode.height : 0;
    const rightHeight = treeNode.rightNode ? treeNode.rightNode.height : 0;
    treeNode.height = Math.max(leftHeight, rightHeight) + 1;

    const leftHeightL = leftNode.leftNode ? leftNode.leftNode.height : 0;
    const rightHeightL = leftNode.rightNode ? leftNode.rightNode.height : 0;
    leftNode.height = Math.max(leftHeightL, rightHeightL) + 1;

    console.log("Fiz a rotação para direita");
    return leftNode;
  }

  public rotateLeftRight(treeNode: TreeNode): TreeNode | null {
    if (treeNode.leftNode === null) return null;
    treeNode.leftNode = this.rotateLeft(treeNode.leftNode);
    console.log("Fiz a rotação dupla Esquerda-Direita");
    return this.rotateRight(treeNode);
  }

  public rotateRightLeft(treeNode: TreeNode): TreeNode | null {
    if (treeNode.rightNode === null) return null;
    treeNode.rightNode = this.rotateRight(treeNode.rightNode);
    console.log("Fiz a rotação dupla Direita-Esquerda");
    return this.rotateLeft(treeNode);
  }

  public balance(root: TreeNode) {
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
    if (!(root instanceof TreeNode)) return null;
    const [leftHeight, rightHeight] = this.calculateNodeHeight(root);
    if (contact.name === root.contact.name) {
      if (root.leftNode == null && root.rightNode == null) {
        console.log(`Elemento folha removido: ${contact.name}`);
      } else {
        if (root.leftNode != null && root.rightNode != null) {
          let aux = root.leftNode;
          while (aux.rightNode != null) aux = aux.rightNode;
          root.contact = aux.contact;
          aux.contact = contact;
          console.log(`Elemento trocado: ${contact.name}`);
          root.leftNode = this.removeContact(root.leftNode, contact);
        } else {
          let aux;
          if (root.leftNode) {
            aux = root.leftNode;
          } else {
            aux = root.rightNode;
          }
          console.log(`Elemento com um filho removido: ${contact.name}`);
          return aux;
        }
      }
    } else {
      if (contact.name < root.contact.name) {
        root.leftNode = this.removeContact(root.leftNode, contact);
      } else {
        root.rightNode = this.removeContact(root.rightNode, contact);
      }
      root.height = this.compareHeight(leftHeight, rightHeight) + 1;
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