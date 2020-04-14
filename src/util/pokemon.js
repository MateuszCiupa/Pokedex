export const POKE_DISPLAY_LIMIT = 36;
export const apiUrl = "https://pokeapi.co/api/v2";
export const pokeUrl = `${apiUrl}/pokemon`;
export const pokeCountUrl = `${pokeUrl}?offset=0&limit=1`;

export const getTypes = () => fetch(`${apiUrl}/type`);

export const getPokeWithLimits = (offset, limit) =>
  fetch(`${pokeUrl}?offset=${offset}&limit=${limit}`);

export const getSprite = (sprites = {}) => {
  const {
    front_default,
    front_shiny,
    front_female,
    front_shiny_female,
  } = sprites;

  return front_default
    ? front_default
    : front_shiny
    ? front_shiny
    : front_female
    ? front_female
    : front_shiny_female
    ? front_shiny_female
    : `${process.env.PUBLIC_URL}/img/PokeUnknown.png`;
};
