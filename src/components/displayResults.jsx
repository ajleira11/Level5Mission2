export const DisplayResults = ({ data, suggestedCars, image }) => {
  return (
    <div>
      <div className="userDetails">
        <div>
          <img width="300" src={image}></img>
          {data && (
            <div>
              <h2>{data.text}</h2>
              <h3>Color: {data.carcolor}</h3>
              <h3>Type: {data.cartype}</h3>
            </div>
          )}
        </div>

        <div className="displayresults">
          {suggestedCars &&
            suggestedCars.map((car, index) => (
              <div className="displayResultsItem" key={index}>
                <img width="300" src={car.image} alt={`Car ${index}`} />
                <h2>Brand: {car.brand}</h2>
                <h3>Color: {car.color}</h3>
                <h3>Price: {car.price}</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
