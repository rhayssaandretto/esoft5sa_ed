import fs from "fs";
import { BinarySearchTree } from "./binarySearchTree";

export class Dictionary {
  private readonly fileName: string = "../../src/ex03/palavras_chave.txt";
  private readonly bst: BinarySearchTree;

  constructor() {
    this.bst = new BinarySearchTree();
  }

  public readFile(): any {
    try {
      const data = fs.readFileSync(this.fileName, "utf-8");
      return this.splitWords(data);
    } catch (error) {
      console.error(`Erro ao ler o arquivo ${this.fileName}`, error);
    }
  }

  public splitWords(data: string): string[] {
    const lines = data.split("\n");
    return lines.map((line) => line.trim());
  }

  public async buildDictionary() {
    const words = await this.readFile();
    for (const word of words) {
      this.bst.insert(word);
      console.log(`Palavra "${word}" inserida na árvore.`);
    }
    console.log("Árvore construída:", this.bst);
  }

  public searchDictionary(word: string) {
    const search = this.bst.search(word.toLowerCase());
    console.log("search", search);

    return search;
  }
}
