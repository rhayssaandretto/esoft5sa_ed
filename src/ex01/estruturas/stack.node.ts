import { Action } from './../action';

export class StackNode {

    private _action: Action;

    private _next: StackNode | null;

    constructor(action: Action) {
        this._action = action;
        this._next = null;
    }

    get action(): Action {
        return this._action;
    }

    get next(): StackNode | null {
        return this._next;
    }

    set next(stackNode: StackNode | null) {
        this._next = stackNode;
    }

}