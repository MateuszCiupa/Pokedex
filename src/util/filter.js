// cant guarantee that min or max is null or undefined (if max is null it means it's equal infinity)
const inInterval = (x, { min, max }) =>
  !!min ? (!!max ? x >= min && x <= max : x >= min) : !!max ? x <= max : true;

// returns true if pokemon should be filtered, false - otherwise
export default (pokemon, filter) => {
  if (!filter.active) return false;

  const { height: pheight, weight: pweight, types } = pokemon;
  const { height: fheight, weight: fweight, type } = filter;

  if (
    (!!fheight && !inInterval(pheight, fheight)) ||
    (!!fweight && !inInterval(pweight, fweight))
  )
    return true;

  if (!!type) {
    for (let e of types) {
      if (e.type.name !== type) return true;
    }
  }

  return false;
};
