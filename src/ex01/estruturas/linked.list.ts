import { Node } from "./linked.list.node";

export class LinkedList<T> {
  head: Node<T> | null = null;
  comparator: (a: T, b: T) => boolean;
  
  constructor(comparator: (a: T, b: T) => boolean) {
    this.comparator = comparator;
  }
  
  insert(data: T): void {

    if(!this.head) {
      this.head = new Node(data);
      return;
    }

    let current: Node<T> | null = this.head;
    while(current.next) {
      current = current?.next;
    }

    current.next = new Node(data);
    
  }
  
  delete(data: T): void {
    if (!this.head) return;

    if (this.comparator(this.head.data, data)) {
      this.head = this.head.next;
      return;
    }

    let current = this.head.next;
    let previous = this.head;

    while (current) {
      if (this.comparator(current.data, data)) {
        previous.next = current.next;
        break;
      }

      previous = current;
      current = current.next;
    }
  }
  
  search(data: T): Node<T> | null {
    let current = this.head;

    while (current) {
      if (this.comparator(current.data, data)) {
        return current;
      }
        
      current = current.next;
    }

    return null;
  }
  
  traverse() {
    let current = this.head;
    while (current != null) {
      console.log(current.data);
      current = current.next;
    }
  }
}