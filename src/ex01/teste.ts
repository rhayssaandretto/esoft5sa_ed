import { Action } from "./action";
import { ActionType } from "./actionType";
import { Stack } from "./estruturas/stack";
import { Product } from "./product";

const stack = new Stack();

const product = new Product("Miojo", 12.50, 2);
const product2 = new Product("Bolacha", 12.50, 2);
const product3 = new Product("Sal", 12.50, 2);

const action = new Action(ActionType.Insert, product);
const action2 = new Action(ActionType.Insert, product2);
const action3 = new Action(ActionType.Insert, product3);
const action4 = new Action(ActionType.Remove, product);

stack.push(action);
stack.push(action2);
stack.push(action3);
stack.push(action4);

stack.show();