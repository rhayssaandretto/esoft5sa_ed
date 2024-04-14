import { Contact } from "./contact";
import { ListNode } from "./estruturas/list.node";

export class PhoneBookLinkedList {
  private start: ListNode | null;

  constructor() {
    this.start = null;
  }

  // public addContact(contact: Contact): void {
  //   const newNode = new ListNode(contact);

  //   if (!this.start) this.start = newNode;
  //   else {
  //     let currentNode = this.start;
  //     while (currentNode.next !== null) currentNode = currentNode.next;
  //     currentNode.next = newNode;
  //   }
  // }

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

  public removeContact(name: string): string | null {
    if (!this.start) return `Não há contato para remover.`;
    if (this.start.contact.name === name) {
      this.start = this.start.next;
      return `Contato removido com sucesso`;
    }
    let currentNode = this.start;
    while (currentNode.next !== null) {
      if (currentNode.next.contact.name === name) {
        currentNode.next = currentNode.next.next;
        return `Contato removido com sucesso!`;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  public searchContact(name: string): Contact | null | string {
    let currentNode = this.start;
    while (currentNode !== null) {
      if (currentNode.contact.name === name) return currentNode.contact.name;
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