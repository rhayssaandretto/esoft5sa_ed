import { Contact } from "../contact";

export class TreeNode {
  contact: Contact;
  leftNode: TreeNode | null;
  rightNode: TreeNode | null;

  constructor(contact: Contact) {
    this.contact = contact;
    this.leftNode = null;
    this.rightNode = null;
  }
}
