import React from 'react'

 const SearchBar = ({setQuery}) => {
  return (
    <div className='search-container'>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input onChange={(e) => setQuery(e.target.value.toLowerCase())} id="search-input" type="text" placeholder="Search for a country..."></input>
    </div>
  )
}
export default SearchBar