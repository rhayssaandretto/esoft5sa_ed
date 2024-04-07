import { Dictionary } from "./dictionary";

const dicionario = new Dictionary()
dicionario.buildDictionary();

const search = 'cassia';
dicionario.searchDictionary(search);