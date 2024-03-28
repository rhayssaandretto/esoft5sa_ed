import { Action } from "../action";
import { StackNode } from "./stack.node";

export class Stack {

    private _top: StackNode | null = null;

    public push(action: Action): void {
        const newNode = new StackNode(action);
        newNode.next = this._top;
        this._top = newNode;
    }

    public show(): void {

        let stackNode: StackNode | null = this._top;
        while(stackNode) {
            console.log(stackNode.action);
            stackNode = stackNode.next;
        }

    }
}