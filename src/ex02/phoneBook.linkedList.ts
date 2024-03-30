import { Contact } from "./contact";
import { ListNode } from "./estruturas/list.node";

export class PhoneBookLinkedList {
  private start: ListNode | null;

  constructor() {
    this.start = null;
  }

  public addContact(contact: Contact): void {
    const newNode = new ListNode(contact);

    if (!this.start) this.start = newNode;
    else {
      let currentNode = this.start;
      while (currentNode.next !== null) currentNode = currentNode.next;
      currentNode.next = newNode;
    }
  }

  public removeContact(name: string): void {
    if (!this.start) throw new Error("Não há contatos na lista");
    if (this.start.contact.name === name) {
      this.start = this.start.next;
      return;
    }
    let currentNode = this.start;
    while (currentNode.next !== null) {
      if (currentNode.next.contact.name === name) {
        currentNode.next = currentNode.next.next;
        return;
      }
      currentNode = currentNode.next;
    }
    throw new Error("Contato não encontrado");
  }

  public searchContact(name: string): Contact | undefined {
    let currentNode = this.start;
    while (currentNode !== null) {
      if (currentNode.contact.name === name) return currentNode.contact;
      currentNode = currentNode.next;
    }
    throw new Error("Contato não encontrado");
  }
}
