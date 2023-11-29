import { useEffect, useState } from "react";
import "./App.css";
import findCarType from "./services/carType";
import carColor from "./services/carColor";
import listOfCars from "./data/carsdata";
import { DisplayResults } from "./components/displayResults";

const ApiKey = process.env.REACT_APP_API_KEY;
const AzureEndpoint = process.env.REACT_APP_BACKEND_URL;

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
      const response = await fetch(
        `${AzureEndpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,caption`,
        fetchOptions
      );
      const parsedData = await response.json();
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
      setSuggestedCars(cars);
    }
  }, [data]);
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

      <DisplayResults
        className="cars"
        data={data}
        suggestedCars={suggestedCars}
        image={image}
      />
    </div>
  );
}
