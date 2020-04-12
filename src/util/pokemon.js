export const POKE_LIMIT_DEFAULT = 20;
export const POKE_DISPLAY_LIMIT = 20;
export const apiUrl = "https://pokeapi.co/api/v2";
export const pokeUrl = `${apiUrl}/pokemon`;
export const pokeCountUrl = `${pokeUrl}?offset=0&limit=1`;

export const getTypes = () => fetch(`${apiUrl}/type`);

export const getPokeWithLimits = (offset, limit) =>
  fetch(`${pokeUrl}?offset=${offset}&limit=${limit}`);
