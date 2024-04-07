import { Contact } from "./contact";

export class PhoneBookVector {
  protected contacts: Contact[];

  constructor() {
    this.contacts = [];
  }

  public addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  public removeContact(name: string): void {
    const indexToRemove = this.contacts.findIndex(
      (contact) => contact.name === name
    );
    if (indexToRemove !== -1) {
      this.contacts.splice(indexToRemove, 1);
    } else {
      console.log("Contato não encontrado");
    }
  }

  public searchContact(name: string): Contact | undefined {
    return this.contacts.find((contact) => contact.name === name);
  }
}
