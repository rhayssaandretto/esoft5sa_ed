import { Action } from "./action";
import { ActionType } from "./actionType";
import { HashTable } from "./estruturas/hash";
import { Stack } from "./estruturas/stack";
import { Product } from "./product";

export class ProductManager {

    private readonly _productTable: HashTable;
    private readonly _productStack: Stack;

    constructor(productTable: HashTable, productStack: Stack) {
        this._productTable = productTable;
        this._productStack = productStack;
    }

    public add(product: Product): void {
        this._productTable.insert(product);
        this._productStack.push(this.generateAction(ActionType.Insert, product));
    }

    public remove(product: Product): void {
        this._productTable.delete(product);
        this._productStack.push(this.generateAction(ActionType.Remove, product));
    }

    public search(product: Product): Product | null {
        return this._productTable.search(product);
    }

    get productTable(): HashTable {
        return this._productTable;
    }

    get productStack(): Stack {
        return this._productStack;
    }

    private generateAction(action: ActionType, product: Product): Action {
        return new Action(action, product);
    }

}