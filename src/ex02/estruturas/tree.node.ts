import { Contact } from "../contact";

export class TreeNode {
  contact: Contact;
  leftNode: any;
  rightNode: any;
  height: number;

  constructor(contact: Contact) {
    this.contact = contact;
    this.leftNode = null;
    this.rightNode = null;
    this.height = 1;
  }
}
