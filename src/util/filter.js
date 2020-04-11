// cant guarantee that min or max is null or undefined (if max is null it means it's equal infinity)
const inInterval = (x, { min, max }) =>
  !!min ? (!!max ? x >= min && x <= max : x >= min) : !!max ? x <= max : true;

// returns true if pokemon should be filtered, false - otherwise
export default (pokemon, filter) => {
  const { height: pheight, weight: pweight, types } = pokemon;
  const { active, height: fheight, weight: fweight, type } = filter;
  if (!active) return false;

  if (
    (!!fheight && !inInterval(pheight, fheight)) ||
    (!!fweight && !inInterval(pweight, fweight))
  )
    return true;

  for (let e of types) {
    if (e.type.name !== type) return true;
  }

  return false;
};
