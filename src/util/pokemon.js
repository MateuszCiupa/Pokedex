import shouldFilter from "./filter";

export const POKE_LIMIT_DEFAULT = 20;
export const POKE_DISPLAY_LIMIT = 20;
export const apiUrl = "https://pokeapi.co/api/v2";
export const pokeUrl = `${apiUrl}/pokemon`;
export const pokeCountUrl = `${pokeUrl}?offset=0&limit=1`;

export const getTypes = () => fetch(`${apiUrl}/type`);

export const getPokeWithLimits = (offset, limit) =>
  fetch(`${pokeUrl}?offset=${offset}&limit=${limit}`);

export const getPokeMax = async ({
  offset,
  pageLimit,
  pokeCount = 964,
  reverse = false,
  filter,
}) => {
  let limit = 0;
  let received = [];
  try {
    while (received.length < pageLimit && offset + limit < pokeCount) {
      let response = await getPokeWithLimits(
        offset + limit,
        POKE_LIMIT_DEFAULT
      );

      if (!response.ok) throw new Error(response.status);

      const { results } = await response.json();

      for (let i = 0; i < results.length; i++) {
        response = await fetch(results[i].url);
        if (!response.ok) throw new Error(response.status);

        // ikr, no other way tho
        const {
          name,
          weight,
          height,
          abilities,
          base_experience,
          sprites,
          types,
        } = await response.json();

        const pokemon = {
          name,
          weight,
          height,
          abilities,
          base_experience,
          sprites,
          types,
        };

        limit++;

        if (!filter.active || !shouldFilter(pokemon, filter)) {
          received.push(pokemon);
          if (received.length === pageLimit)
            return { limit, results: received };
        }
      }
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return {
    limit,
    results: received,
  };
};
