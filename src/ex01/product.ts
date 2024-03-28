
export class Product {
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(name: string, price: number, quantity: number) {
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get quantity(): number {
    return this._quantity;
  }
  
}
