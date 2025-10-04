
import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

const CountriesList = ({ query }) => {
  const [CountriesData, setCountriesData] = useState([]);
  const [count, setCount] = useState(0);
  // const [filteredData, setQuery] = useFilter(data, () => "")
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,flags,region,subregion,capital,currencies,languages,borders,tld"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
        
      });
  }, []);

  return (
    <>
      {!CountriesData.length ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          
          {CountriesData.filter((country) =>
            country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
          ).map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population.toLocaleString("en-IN")}
                region={country.region}
                capital={country.capital?.length ? country.capital[0] : "N/A"}
                data={country}
            
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CountriesList;
