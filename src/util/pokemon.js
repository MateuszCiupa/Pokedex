export const pokeApiDefaultUrl = "https://pokeapi.co/api/v2/pokemon";

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) return data;
  } catch (e) {
    console.log(e);
  }
  return null;
};
