export default function Ship(length) {
  let hits = 0;

  const hit = () => {
    hits++;
  };

  const isSunk = () => {
    return hits >= length;
  };

  return {
    length,
    hit,
    isSunk,
    get hits() {
      return hits;
    }
  };
}
