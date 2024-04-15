import { Dictionary } from "./dictionary";

async function main() {
  const dicionario = new Dictionary();
  await dicionario.buildDictionary();

  const search = "Amandinha";
  console.log(dicionario.searchDictionary(search));

  const search2 = "Erinaldo";
  console.log(dicionario.searchDictionary(search2));

  const search3 = "Faker";
  console.log(dicionario.searchDictionary(search3));

  const search4 = "Sasuke";
  console.log(dicionario.searchDictionary(search4));
}

main();
