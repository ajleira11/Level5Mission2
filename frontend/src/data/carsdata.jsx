const sedans = [
  {
    model: "Toyota Camry",
    type: "sedan",
    color: "blue",
    brand: "Toyota",
    price: "$25,000",
    image:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/10596/2017-Toyota-Camry-front_10596_032_1829x746_8T7_cropped.png",
  },
  {
    model: "Honda Accord",
    type: "sedan",
    color: "silver",
    brand: "Honda",
    price: "$24,500",
    image:
      "https://news.brannonhonda.com/wp-content/uploads/sites/8/2015/02/2015-Honda-Accord-Silver-e1424274884473.png",
  },
  {
    model: "Ford Fusion",
    type: "sedan",
    color: "red",
    brand: "Ford",
    price: "$23,800",
    image:
      "https://hips.hearstapps.com/autoweek/assets/s3fs-public/17fusionsport_01_hr_0.jpg",
  },
  {
    model: "Chevrolet Malibu",
    type: "sedan",
    color: "black",
    brand: "Chevrolet",
    price: "$22,900",
    image:
      "https://www.chevrolet.ca/content/dam/chevrolet/global/us/english/index/cars/2023-malibu/01-images/mov/01-images/colorizer/2023-malibu-1sp-gb8-colorizer.jpg?imwidth=960",
  },
  {
    model: "Nissan Altima",
    type: "sedan",
    color: "white",
    brand: "Nissan",
    price: "$23,500",
    image:
      "https://vexstockimages.fastly.carvana.io/stockimages/2012_NISSAN_ALTIMA_2.5%20SEDAN%204D_WHITE_stock_desktop_1920x1080.png?v=1645498915.309",
  },
];

const hatchbacks = [
  {
    model: "Volkswagen Golf",
    type: "hatchback",
    color: "gray",
    brand: "Volkswagen",
    price: "$22,500",
    image: "https://i.ytimg.com/vi/U9_6Dna8Sn0/maxresdefault.jpg",
  },
  {
    model: "Ford Focus",
    type: "hatchback",
    color: "blue",
    brand: "Ford",
    price: "$21,800",
    image: "https://images.pistonheads.com/nimg/44600/Focus_ST_Edition_005.jpg",
  },
  {
    model: "Ford Focus",
    type: "hatchback",
    color: "orange",
    brand: "Ford",
    price: "$21,800",
    image:
      "https://i.pinimg.com/originals/e0/e8/ee/e0e8ee4a5bb65176c0f55c784479c677.jpg",
  },
  {
    model: "Honda Fit",
    type: "hatchback",
    color: "red",
    brand: "Honda",
    price: "$20,900",
    image:
      "https://di-uploads-pod27.dealerinspire.com/scottrobinsonhonda/uploads/2020/08/milano-red.png",
  },
  {
    model: "Toyota Prius",
    type: "hatchback",
    color: "green",
    brand: "Toyota",
    price: "$24,000",
    image:
      "https://global.toyota/pages/news/images/2015/12/09/1300/pri1512_19_s.jpg",
  },
  {
    model: "Chevrolet Spark",
    type: "hatchback",
    color: "yellow",
    brand: "Chevrolet",
    price: "$19,500",
    image:
      "https://dealer-content.s3.amazonaws.com/images/models/chevrolet/2022/spark/colors/nitro-yellow.png",
  },
];

const checkColor = (car, data) => {
  try {
    const output = car.find(
      (check) => check.color === data.carcolor.toLowerCase()
    );
    return output;
  } catch {
    return car[0];
  }
};

export default function listOfCars(data) {
  if (data.cartype.toLowerCase() === "sedan") {
    return checkColor(sedans, data);
  } else {
    return checkColor(hatchbacks, data);
  }

  return null;
}
