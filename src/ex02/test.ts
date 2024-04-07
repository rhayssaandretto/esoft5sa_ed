import { PhoneBookBinarySearchTree } from "./phoneBook.binaryTree";
import { Contact } from "./contact";

const phoneBook = new PhoneBookBinarySearchTree();

const contacts: Contact[] = [
  new Contact("AAAAA", "123456"),
  new Contact("BBBBB", "123456"),
  new Contact("CCCCC", "123456"),
  new Contact("DDDDD", "123456"),
  new Contact("EEEEE", "123456"),
  new Contact("FFFFF", "123456"),
  new Contact("GGGGG", "123456"),
  new Contact("HHHHH", "123456"),
  new Contact("IIIII", "123456"),
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