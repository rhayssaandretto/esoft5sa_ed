import { PhoneBookLinkedList } from "./phoneBook.linkedList";
import { Contact } from "./contact";

const phoneBook = new PhoneBookLinkedList();

const contacts: Contact[] = [
  new Contact("Alice", "123456"),
  new Contact("Beatriz", "123456"),
  new Contact("Ester", "123456"),
  new Contact("Francisco", "123456"),
  new Contact("Carla", "123456"),
  new Contact("Gabriel", "123456"),
  new Contact("Dora", "123456"),
  new Contact("Heitor", "123456"),
  new Contact("Italo", "123456"),
];

contacts.forEach((contact) => phoneBook.addContact(contact));
console.log(`Phone Book: `);
phoneBook.printLinkedList();
phoneBook.removeContact("Ester");
console.log(`Phone Book após remoção:`);
phoneBook.printLinkedList();
console.log(`Resultado encontrado: ${phoneBook.searchContact("Beatriz")}`);
