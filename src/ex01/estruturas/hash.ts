import { Product } from "../product";
import { LinkedList } from "./linked.list";

export class HashTable {

    private readonly MULTIPLICADOR: number = 0.618;
    private readonly tableSize: number;
    private readonly products: LinkedList<Product>[] = [];

    constructor(size: number) {
        this.tableSize = size;
    }

    public insert(product: Product):void {
        const index = this.generateHash(product.name);

        if (!this.products[index]) {
            this.products[index] = new LinkedList<Product>(
                (a: Product, b: Product) => a === b
            );
        }
      
        this.products[index].insert(product);

    }
    
    public search(product: Product): Product | null {
        const index = this.generateHash(product.name);

        if (!this.products[index]) {
            return null;
        }

        const foundProduct = this.products[index].search(product);
        return foundProduct ? foundProduct.data : null;
    }

    public delete(product: Product): void {
        const index = this.generateHash(product.name);

        if (this.products[index]) {
            this.products[index].delete(product);
        }

    }

    private generateHash(key: string): number {
        const keySize = key.length;
        return Math.floor(this.tableSize * (keySize * this.MULTIPLICADOR % 1));
    }

}