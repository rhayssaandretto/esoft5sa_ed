import fs from "fs";
import { BinarySearchTree } from "./binarySearchTree";

export class Dictionary {
  private readonly fileName: string = "../../src/ex03/palavras_chave.txt";
  private readonly bst: BinarySearchTree;

  constructor() {
    this.bst = new BinarySearchTree();
  }

  //   public readFile(): any {
  //     fs.readFile(this.fileName, "utf8", (err, data) => {
  //       if (err) {
  //         console.error(`Erro ao ler o arquivo ${this.fileName}`, err);
  //       }
  //       const words = this.splitWords(data);
  //       return words;
  //     });
  //   }

  public readFile(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.fileName, "utf8", (err, data) => {
        if (err) {
          console.error(`Erro ao ler o arquivo ${this.fileName}`, err);
          reject(err);
        } else {
          const words = this.splitWords(data);
          resolve(words);
        }
      });
    });
  }

  public splitWords(data: string): string[] {
    const lines = data.split("\n");
    return lines.map((line) => line.trim());
  }

  public async buildDictionary() {
    const words = await this.readFile();
    console.log(words);
    for (const word of words) {
      this.bst.insert(word);
    }
  }

  public searchDictionary(word: string) {
    const search = this.bst.search(word.toLowerCase());
    console.log("search", search);

    return search;
  }
}
