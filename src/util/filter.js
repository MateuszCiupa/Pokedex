// cant guarantee that min or max is null or undefined (if max is null it means it's equal infinity)
const inInterval = (x, { min, max }) =>
  !!min ? (!!max ? x >= min && x <= max : x >= min) : !!max ? x <= max : true;

// returns true if pokemon should be filtered, false - otherwise
export default (pokemon, filter) => {
  const { height: pheight, weight: pweight, types } = pokemon;
  const { active, height: fheight, weight: fweight, type } = filter;

  if (!active) return false;

  if (!inInterval(pheight, fheight) || !inInterval(pweight, fweight))
    return true;

  types.forEach((e) => {
    if (e.type === type) return true;
  });

  return false;
};
