const carTypesFull = [
  "sedan",
  "suv",
  "coupe",
  "convertible",
  "hatchback",
  "wagon",
  "van",
  "minivan",
  "pickup truck",
  "off road",
  "truck",
  "sports car",
  "compact",
  "family car",
  "crossover",
  "luxury car",
  "luxury vehicle",
  "mid-size car",
];

export default function findCarType(tagNames) {
  try {
    for (const tag of tagNames) {
      const matchingCar = carTypesFull.find((car) => car === tag.name);

      if (matchingCar) {
        if (
          matchingCar === "luxury car" ||
          "mid-size car" ||
          "luxury vehicle" ||
          "family car"
        ) {
          const matchingCar = "Sedan";
          return matchingCar;
        } else if (matchingCar === "coupe" || "compact") {
          const matchingCar = "Hatchback";
          return matchingCar;
        }
        return matchingCar;
      }
    }
    // If no match is found set unknown so we can handle logic based on this
    return "Hatchback";
  } catch (error) {
    console.error("Error in findCarType:", error);
    return "unknown";
  }
}
