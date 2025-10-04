import React from 'react'

export const SelectMenu = ({setQuery}) => {
  return (
    //e.target.value karne sai jo option mai set kia wala value miljaiga
    <select className="filter-by-region" onChange={(e) => setQuery(e.target.value.toLowerCase())}>
                <option hidden>Filter by region</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
  )
}

export default SelectMenu 