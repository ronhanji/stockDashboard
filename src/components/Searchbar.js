import React from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { writeData } from "../firebase";
import { useAuth } from "../contexts/AuthContext"

export default function Searchbar(props){
  const {currentUser} = useAuth();
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': 'bcd17d8649msh1a4d4a88d9ce8ecp1e8d82jsnb54cd73ef7d2',
          'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com'
      }
  };
  
  const handleOnSearch = (string, results) => {
    if (string!==""){
        fetch(`https://ms-finance.p.rapidapi.com/market/v2/auto-complete?q=${string}`, options)
        .then(response => response.json())
        .then(response => props.setData(response.results))
        .catch(err => console.error(err));
    }
  }
  
  const handleOnHover = (result) => {
    // the item hovered
    console.log("")
  }
    
  const handleOnSelect = (item) => {
    props.setSelectedItems(prevItem=>prevItem.concat([item]))
    writeData(currentUser.uid,props.selectedItems.concat([item]))
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.ticker}</span>
      </>
    )
  }
  return(
      <ReactSearchAutocomplete 
            items={props.data}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            maxResults={5}
            placeholder="Type your stock name here.."
            styling={{height:"44px"}}
        />
  )
}