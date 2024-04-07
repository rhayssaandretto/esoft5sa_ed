import { Contact } from "../contact";

export class ListNode {
  public contact: Contact;
  public next: ListNode | null = null;

  constructor(contact: Contact) {
    this.contact = contact;
    this.next = null;
  }
}
