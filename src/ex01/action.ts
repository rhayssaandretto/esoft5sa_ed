import { ActionType } from "./actionType";
import { Product } from "./product";

export class Action {
  private readonly _date: Date = new Date();
  private readonly _actionType: ActionType;
  private readonly _product: Product;

  constructor(actionType: ActionType, product: Product) {
    this._actionType = actionType;
    this._product = product;
  }

  public get date(): Date {
    return this._date;
  }

  public get actionType(): ActionType {
    return this._actionType;
  }

  public get product(): Product {
    return this._product;
  }
}
