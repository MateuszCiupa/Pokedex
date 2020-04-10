export const POKE_LIMIT = 20;
export const pokeUrl = "https://pokeapi.co/api/v2/pokemon";
const url = "https://pokeapi.co/api/v2";

export const getPokemonCount = () => fetch(`${url}/pokemon?offset=0&limit=1`);

export const getPokemons = () => fetch(`${url}/pokemon`);

export const getPokemon = (n) => fetch(`${url}/pokemon/${n}`);

export const getTypes = () => fetch(`${url}/type`);
