import { Contact } from "./contact";
import { ListNode } from "./estruturas/list.node";

export class PhoneBookLinkedList {
  private start: ListNode | null;

  constructor() {
    this.start = null;
  }

  public addContact(contact: Contact): void {
    const newNode = new ListNode(contact);

    if (!this.start || contact.name < this.start.contact.name) {
      newNode.next = this.start;
      this.start = newNode;
      return;
    }

    let currentNode = this.start;
    while (
      currentNode.next !== null &&
      currentNode.next.contact.name < contact.name
    ) {
      currentNode = currentNode.next;
    }

    newNode.next = currentNode.next;
    currentNode.next = newNode;
  }

  public removeContact(name: string): void {
    if (!this.start) {
      console.log(`Não há contato para remover.`);
      return;
    }

    if (this.start.contact.name === name) {
      this.start = this.start.next;
      console.log(`Contato ${name} removido com sucesso`);
      return;
    }
    let currentNode = this.start;
    while (currentNode.next !== null) {
      if (currentNode.next.contact.name === name) {
        currentNode.next = currentNode.next.next;
        console.log(`Contato ${name} removido com sucesso!`);
        return;
      }
      currentNode = currentNode.next;
    }
    return;
  }

  public searchContact(name: string): Contact | null | string {
    let currentNode = this.start;
    while (currentNode !== null) {
      if (currentNode.contact.name === name)
        return `${currentNode.contact.name} - ${currentNode.contact.phoneNumber}`;
      currentNode = currentNode.next;
    }
    return null;
  }

  public printLinkedList(): void {
    let currentNode = this.start;
    while (currentNode !== null) {
      console.log(
        `${currentNode.contact.name} : ${currentNode.contact.phoneNumber}`
      );
      currentNode = currentNode.next;
    }
  }
}