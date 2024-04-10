import { PhoneBookBinarySearchTree } from "./phoneBook.binaryTree";
import { Contact } from "./contact";

const phoneBook = new PhoneBookBinarySearchTree();

const contacts: Contact[] = [
  new Contact("Alice", "123456"),
  new Contact("Beatriz", "123456"),
  new Contact("Carla", "123456"),
  new Contact("Dora", "123456"),
  new Contact("Ester", "123456"),
  new Contact("Francisco", "123456"),
  new Contact("Gabriel", "123456"),
  new Contact("Heitor", "123456"),
  new Contact("Italo", "123456"),
];
contacts.forEach((contact) => phoneBook.insert(contact));

if (phoneBook.root !== null) {
  console.log("Árvore balanceada:");
  phoneBook.printBalancedTree(phoneBook.getRoot(), 0);
} else {
  console.log("A árvore está vazia.");
}

const contactToRemove = new Contact("GGGGG", "123456");
console.log(`Removendo o contato ${contactToRemove.name} da árvore:`);
const root = phoneBook.getRoot();
if (root !== null) phoneBook.removeContact(root, contactToRemove);
console.log("A árvore está vazia");

if (phoneBook.root !== null) {
  console.log("Árvore balanceada após a remoção:");
  phoneBook.printBalancedTree(phoneBook.getRoot(), 0);
} else {
  console.log("A árvore está vazia após a remoção.");
}

if (root) {
  console.log(
    "Resultado encontrado:",
    phoneBook.search(root, new Contact("10", "123456"))
  );
  console.log(
    "Resultado encontrado:",
    phoneBook.search(root, new Contact("20", "123456"))
  );
  console.log(
    "Resultado encontrado:",
    phoneBook.search(root, new Contact("30", "123456"))
  );
  console.log(
    "Resultado encontrado:",
    phoneBook.search(root, new Contact("15", "123456"))
  );
}
