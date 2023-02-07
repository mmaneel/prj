
import React, { useState } from "react";
import { BiSearch} from 'react-icons/bi';
import devs from '../../data'
import BookData from "../../data.json";

function EsseyF({ placeholder, data }) {

    const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord =
    BookData.map((d)=>(
       d.country))
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  
  return (
    <div className="search">
    <div className="searchInputs">
    <select className="slct_opt" onChange={handleFilter}
            >
                          
                          <option value={wordEntered}>{handleFilter}</option>
                          
                       </select>
    
      
      
      
    </div>
    {filteredData.length !== 0 && (
      <div className="dataResult">
        {filteredData.slice(0, 15).map((value, key) => {
          return (
           
              <p>{value.country} </p>
           
          );
        })}
      </div>
    )}
  </div>
  )
}

export default EsseyF