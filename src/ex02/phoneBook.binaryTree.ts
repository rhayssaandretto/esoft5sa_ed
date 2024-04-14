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
    return height1 > height2 ? height1 : height2;
  }

  public calculateNodeHeight(treeNode: TreeNode) {
    if (treeNode === null) return -1;
    else {
      return treeNode?.height;
    }
  }

  public getBalanceFactor(treeNode: TreeNode): number {
    if (treeNode == null) return 0;
    else
      return (
        this.calculateNodeHeight(treeNode.leftNode) -
        this.calculateNodeHeight(treeNode.rightNode)
      );
  }

  public rotateLeft(root: TreeNode): TreeNode | null {
    const rightNode = root.rightNode; //y
    const rightLeftNode = rightNode.leftNode; //f
    rightNode.leftNode = root;
    root.rightNode = rightLeftNode;

    root.height =
      this.compareHeight(
        this.calculateNodeHeight(root.leftNode),
        this.calculateNodeHeight(root.rightNode)
      ) + 1;
    rightNode.height =
      this.compareHeight(
        this.calculateNodeHeight(rightNode.leftNode),
        this.calculateNodeHeight(rightNode.rightNode)
      ) + 1;

    console.log("Fiz a rotação para esquerda");
    return rightNode;
  }

  public rotateRight(root: TreeNode): TreeNode | null {
    const leftNode = root.leftNode;
    const leftRightNode = leftNode.rightNode;
    leftNode.rightNode = root;
    root.leftNode = leftRightNode;

    root.height =
      this.compareHeight(
        this.calculateNodeHeight(root.leftNode),
        this.calculateNodeHeight(root.rightNode)
      ) + 1;
    leftNode.height =
      this.compareHeight(
        this.calculateNodeHeight(leftNode.leftNode),
        this.calculateNodeHeight(leftNode.rightNode)
      ) + 1;

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

  // public balance(root: TreeNode | null): TreeNode | null {
  //   if (root == null) return null;
  //   else {
  //     const getBalanceFactor = this.getBalanceFactor(root);
  //     if (getBalanceFactor < -1 && this.getBalanceFactor(root.rightNode) <= 0)
  //       root = this.rotateLeft(root);
  //     if (getBalanceFactor > 1 && this.getBalanceFactor(root.leftNode) >= 0)
  //       root = this.rotateRight(root);
  //     if (getBalanceFactor > 1 && this.getBalanceFactor(root.leftNode) < 0)
  //       root = this.rotateLeftRight(root);
  //     if (getBalanceFactor < -1 && this.getBalanceFactor(root.rightNode) > 0)
  //       root = this.rotateRightLeft(root);
  //     return root;
  //   }
  // }

  public balance(root: TreeNode | null): TreeNode | null {
    if (root == null) return null;
    const getBalanceFactor = this.getBalanceFactor(root);
    if (getBalanceFactor < -1) {
      if (this.getBalanceFactor(root?.rightNode) <= 0)
        return this.rotateLeft(root);
      else return this.rotateRightLeft(root);
    }
    if (getBalanceFactor > 1) {
      if (this.getBalanceFactor(root?.leftNode) >= 0)
        return this.rotateRight(root);
      else return this.rotateLeftRight(root);
    }
    return root;
  }

  public search(root: TreeNode | null, contact: Contact): string | null {
    if (root === null) return null;
    if (contact.name === root.contact.name) {
      return root.contact.name;
    } else if (contact.name < root.contact.name) {
      return this.search(root.leftNode, contact);
    } else {
      return this.search(root.rightNode, contact);
    }
  }

  public removeContact(root: TreeNode | null, contact: Contact) {
    if (root === null) {
      console.log("Contato não encontrado");
      return null;
    } else {
      if (!(root instanceof TreeNode)) return null;

      if (contact.name === root.contact.name) {
        if (root.leftNode == null && root.rightNode == null) {
          console.log(`Elemento folha removido: ${contact.name}`);
        } else {
          if (root.leftNode == null && root.rightNode == null) {
            let aux = root.leftNode;
            while (aux.rightNode != null) aux = aux.rightNode;
            root.leftNode = aux;
            aux = contact;
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
        root.height =
          this.compareHeight(
            this.calculateNodeHeight(root.leftNode),
            this.calculateNodeHeight(root.rightNode)
          ) + 1;
        root = this.balance(root);
        return root;
      }
    }
  }
  public getRoot(): TreeNode | null {
    return this.root;
  }

  // public printBalancedTree(root: TreeNode | null, level: number) {
  //   if (root !== null) {
  //     this.printBalancedTree(root.rightNode, level + 1);
  //     let i: number;
  //     for (i = 0; i < level; i++) {
  //       process.stdout.write("\t\t");
  //     }
  //     console.log(root.contact.name + ": " + root.contact.phoneNumber);
  //     this.printBalancedTree(root.leftNode, level + 1);
  //   } else {
  //     for (let i = 0; i < level; i++) {
  //       process.stdout.write("\t\t");
  //     }
  //     console.log("-");
  //   }
  // }
  public printBalancedTree(root: TreeNode | null, level: number) {
    if (root !== null) {
      if (root.rightNode) {
        this.printBalancedTree(root.rightNode, level + 1);
      } else {
        console.log("\t\t" + "-");
      }

      let i: number;
      for (i = 0; i < level; i++) {
        process.stdout.write("\t\t");
      }
      console.log(root.contact.name + ": " + root.contact.phoneNumber);

      if (root.leftNode) {
        this.printBalancedTree(root.leftNode, level + 1);
      } else {
        console.log("\t\t" + "-");
      }
    } else {
      for (let i = 0; i < level; i++) {
        process.stdout.write("\t\t");
      }
      console.log("-");
    }
  }
}