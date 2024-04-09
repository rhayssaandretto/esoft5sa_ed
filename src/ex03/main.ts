// import { Dictionary } from "./dictionary";

// const dicionario = new Dictionary()
//  dicionario.buildDictionary();

// const search = 'maiúsculas';
// console.log(dicionario.searchDictionary(search));
import { Dictionary } from "./dictionary";

async function main() {
  const dicionario = new Dictionary();
  await dicionario.buildDictionary();

  console.log(dicionario);
  

  const search = 'pé';
  console.log(dicionario.searchDictionary(search));
}
main()