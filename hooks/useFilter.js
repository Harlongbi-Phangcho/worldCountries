import { useEffect, useState } from "react";

// export function useFilter(initialQuery = "", initialRegion = "") {
export function useFilter(initialQuery = "") {
  const [countriesData, setCountriesData] = useState([]);
  const [query, setQuery] = useState(initialQuery);
//   const [region, setRegion] = useState(initialRegion);
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,flags,region,subregion,capital,currencies,languages,borders,tld"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
        // setLoading(false);
      })
    //   .catch(() => setLoading(false));
  }, []);

  const filteredData = countriesData.filter((country) => {
    const matchesQuery = country.name.common
      .toLowerCase()
      .includes(query.toLowerCase());

      return matchesQuery;
      // const matchesRegion = region ? country.region === region : true;
    // return matchesQuery && matchesRegion;
  });

  return [filteredData, { setQuery }];
}
