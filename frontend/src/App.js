import { useEffect, useState } from "react";
import "./App.css";
import findCarType from "./services/carType";
import carColor from "./services/carColor";
import listOfCars from "./data/carsdata";

const ApiKey = process.env.REACT_APP_API_KEY;
const AzureEndpoint = process.env.REACT_APP_BACKEND_URL;
const analysis = process.env.REACT_APP_ANALYSIS;

export default function App() {
  const [data, setData] = useState();
  const [image, setImage] = useState(
    "https://www.toyota.co.nz/globalassets/new-vehicles/camry/2021/camry-zr-axhzr-nm1-axrzr-nm1/clear-cuts/updated-clear-cuts/camry-zr-eclipse.png"
  );
  const [suggestedCars, setSuggestedCars] = useState([]);

  const handleOnChange = (e) => {
    setImage(e.target.value);
  };

  const onButtonClick = async (e) => {
    e.preventDefault();
    console.log("Click registered and ready to fetch!");
    try {
      const fetchOptions = {
        method: "POST",
        timeout: 50000,
        headers: {
          "Ocp-Apim-Subscription-Key": ApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: image,
        }),
      };
      const response = await fetch(`${AzureEndpoint}${analysis}`, fetchOptions);
      const parsedData = await response.json();
      console.log(parsedData);
      const cartype = findCarType(parsedData.tagsResult.values);
      const carcolor = carColor(parsedData.captionResult.text);
      const text = parsedData.captionResult.text;
      setData({
        text,
        carcolor,
        cartype,
      });
    } catch (error) {
      console.error("There is an error during fetch:", error);
    }
  };

  useEffect(() => {
    if (data) {
      const cars = listOfCars(data);
      console.log(data);
      setSuggestedCars(cars);
    }
  }, [data]);
  console.log(suggestedCars);
  return (
    <div className="App">
      <div className="inputContainer">
        <h2>Enter your Image Here </h2>
        <input
          className="Input"
          placeholder="Enter image URL"
          onChange={handleOnChange}
          value={image}
        />
        <button className="Button" onClick={onButtonClick}>
          Run Service
        </button>
      </div>
      <div className="inputContainer">
        <img width="300" src={image}></img>

        {data && (
          <>
            <h2>{data.text}</h2>
            {<h3>Color: {data.carcolor}</h3>}
            {<h3>Type: {data.cartype}</h3>}
          </>
        )}
      </div>
      {suggestedCars &&
        suggestedCars.map((car, index) => (
          <div className="inputContainer" key={index}>
            <img width="300" src={car.image} alt={`Car ${index}`} />
            <h2>Brand: {car.brand}</h2>
            <h3>Color: {car.color}</h3>
            <h3>Price: {car.price}</h3>
          </div>
        ))}
    </div>
  );
}
