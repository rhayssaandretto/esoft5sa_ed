import { PhoneBookBinarySearchTree } from "./phoneBook.binaryTree";
import { Contact } from "./contact";

const phoneBook = new PhoneBookBinarySearchTree();

const contacts: Contact[] = [
  new Contact("MMMM", "123456"),
  new Contact("AAAAA", "123456"),
  new Contact("BBBBB", "123456"),
  new Contact("CCCCC", "123456"),
];
contacts.forEach((contact) => phoneBook.insert(contact));

if (phoneBook.root !== null) {
  console.log("Árvore balanceada:");
  phoneBook.printBalancedTree(phoneBook.getRoot(), 0);
} else {
  console.log("A árvore está vazia.");
}
