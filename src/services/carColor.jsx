const carColors = [
  "black",
  "white",
  "blue",
  "green",
  "pink",
  "orange",
  "yellow",
  "olive",
  "red",
  "violet",
  "purple",
  "indigo",
  "silver",
  "gold",
  "gray",
  "brown",
  "beige",
];

export default function carColor(tagResult) {
  const arrayOfText = tagResult.toLowerCase().split(" ");

  for (const word of arrayOfText) {
    for (const color of carColors) {
      if (color === word) {
        return color.charAt(0).toUpperCase() + color.slice(1);
      }
    }
  }

  return "unknown";
}
