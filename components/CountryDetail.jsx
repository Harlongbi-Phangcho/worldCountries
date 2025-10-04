import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";

import { useTheme } from "../hooks/useTheme";
import CountryDetailShimmer from "./CountryDetailShimmer";

export const CountryDetail = () => {
  const params = useParams();
  const { state } = useLocation();
  const [isDark] = useTheme();
  const CountryName = params.country;
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  function updateCountryData(data) {
    console.log(data);
    setCountryData({
      nativeName: data.name.nativeName
        ? Object.values(data.name.nativeName)?.[0]?.common || "N/A"
        : "N/A",
      population: data.population,
      region: data.region,
      subRegion: data.subregion ? data.subregion : "N/A",
      flag: data.flags.svg,
      capital:
        data.capital && data.capital.length > 0
          ? data.capital.join(", ")
          : "N/A",
      tld: data.tld,
      currencies:
        data.currencies && Object.keys(data.currencies).length > 0
          ? Object.values(data.currencies)
              .map((currency) => currency.name)
              .join(", ")
          : "N/A",
      languages:
        data.languages && Object.keys(data.languages).length > 0
          ? Object.values(data.languages).join(", ")
          : "N/A",
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }

    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setCountryData((prevState) => ({ ...prevState, borders }));
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${CountryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, [CountryName]);

  if (notFound) {
    return <div>Country not found...</div>;
  }

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-btn" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left-long"></i>&nbsp;Back
        </span>
       
        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flag} alt={`${countryData.name} flag`} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: </b>
                  <span className="native-name">{countryData.nativeName}</span>
                </p>
                <p>
                  <b>Population: </b>
                  <span className="population">
                    {countryData.population.toLocaleString("en-IN")}
                  </span>
                </p>
                <p>
                  <b>Region: </b>
                  <span className="region">{countryData.region}</span>
                </p>
                <p>
                  <b>Sub Region: </b>
                  <span className="sub-region">{countryData.subRegion}</span>
                </p>
                <p>
                  <b>Capital: </b>
                  <span className="capital">{countryData.capital}</span>
                </p>
                <p>
                  <b>Top Level Domain: </b>
                  <span className="tld">{countryData.tld}</span>
                </p>
                <p>
                  <b>Currency: </b>
                  <span className="currency">{countryData.currencies}</span>
                </p>
                <p>
                  <b>Languages: </b>
                  <span className="languages">{countryData.languages}</span>
                </p>
              </div>
              {countryData.borders.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b> &nbsp;
                  {countryData.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CountryDetail;
