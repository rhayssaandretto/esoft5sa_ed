import { Dictionary } from "./dictionary";

async function main() {
  const dicionario = new Dictionary();
  await dicionario.buildDictionary();

  console.log(dicionario);

  const search = "amandinha";
  console.log(dicionario.searchDictionary(search));
}
main();
