export class TreeNode {
    word: string;
    leftNode: any;
    rightNode: any;
    height: number;
  
    constructor(word: string) {
      this.word = word;
      this.leftNode = null;
      this.rightNode = null;
      this.height = 1;
    }
  }