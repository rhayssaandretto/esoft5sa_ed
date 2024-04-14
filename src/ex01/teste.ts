import { HashTable } from "./estruturas/hash";
import { Stack } from "./estruturas/stack";
import { Product } from "./product";
import { ProductManager } from "./product.manager";

const stack = new Stack();
const hashTable = new HashTable(10);

const productManager = new ProductManager(hashTable,stack);

const product = new Product("Miojo", 12.50, 2);
const product2 = new Product("Bolacha", 12.50, 2);
const product3 = new Product("Sal", 12.50, 2);

productManager.add(product);
productManager.add(product2);
productManager.add(product3);

productManager.productStack.show();
console.log(productManager.productTable.search(product))