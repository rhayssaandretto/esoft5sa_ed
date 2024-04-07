import fs from "fs";
import { BinarySearchTree } from "./binarySearchTree";

export class Dictionary {
  private readonly fileName: string = "../../src/ex03/palavras_chave.txt";
  private readonly bst: BinarySearchTree;

  constructor() {
    this.bst = new BinarySearchTree();
  }

  public readFile(): any {
    fs.readFile(this.fileName, "utf8", (err, data) => {
      if (err) {
        console.error(`Erro ao ler o arquivo ${this.fileName}`, err);
      }
      const words = this.splitWords(data);
      return words;
    });
  }

  public splitWords(data: string): string[] {
    const lines = data.split("\n");
    return lines.map((line) => line.trim());
  }

  public buildDictionary() {
    const words = this.readFile();
    for (const word of words) {
      this.bst.insert(word);
    }
  }

  public searchDictionary(word: string) {
    const search = this.bst.search(word);
    return search;
  }
}
