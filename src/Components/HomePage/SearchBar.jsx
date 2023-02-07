import React, { useState ,useEffect} from "react";
import "../HomePage/searchBar.css";
import { BiSearch} from 'react-icons/bi';
import devs from "../../data";
import axios from 'axios'


export const SearchBar=({ placeholder, data }) =>{
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    
    let formField = new FormData()
    formField.append('word',searchWord)
   
    console.log(formField)   
           axios({
            method: 'post',
            url:'http://localhost:8000/api/search',
            data: formField
          }).then(res => {
            console.log(res)

           })

           
  
  };
 

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
      <div className="searchIcon">
          {filteredData.length === 0 ? (
            <BiSearch />
          ) : (
            <BiSearch id="clearBtn" onClick={clearInput} />
          )}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p >{value.name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;