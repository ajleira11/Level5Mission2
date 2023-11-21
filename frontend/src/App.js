import { useEffect, useState } from "react";
import "./App.css";

const ApiKey = process.env.REACT_APP_API_KEY;
const AzureEndpoint = process.env.REACT_APP_BACKEND_URL;
const analysis = process.env.REACT_APP_ANALYSIS;

export default function App() {
  const [data, setData] = useState();
  const [image, setImage] = useState(
    "https://www.toyota.co.nz/globalassets/new-vehicles/camry/2021/camry-zr-axhzr-nm1-axrzr-nm1/clear-cuts/updated-clear-cuts/camry-zr-eclipse.png"
  );

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
      setData(parsedData);
      console.log(parsedData);
    } catch (error) {
      console.error("There is an error during fetch:", error);
    }
  };

  return (
    <div className="App">
      <h1>Turners Car Auctions</h1>
      <div className="inputs">
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
      {data && <h3>{data.captionResult.text}</h3>}
      <img width="300" src={image}></img>

      <ul className="grid-list">
        {data &&
          data.tagsResult.values.map((tag, index) => (
            <li key={index} className="grid-item">
              {tag.name} - Confidence: {(tag.confidence * 100).toFixed(2) + "%"}
            </li>
          ))}
      </ul>
    </div>
  );
}
