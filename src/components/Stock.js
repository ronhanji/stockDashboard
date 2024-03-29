import React,{useState,useEffect} from "react"
import "../styles/Stock.css"

export default function Stock(props){
    const [price,setPrice] = useState(0)
    const [refreshPriceFlag,setRefreshPriceFlag] = useState(false)
    useEffect(() =>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'bcd17d8649msh1a4d4a88d9ce8ecp1e8d82jsnb54cd73ef7d2',
                'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com'
            }
        }   
        fetch(`https://ms-finance.p.rapidapi.com/market/v2/get-realtime-data?performanceIds=${props.data.performanceId}`, options)
        .then(response => response.json())
        .then(response => setPrice(response[props.data.performanceId].lastPrice.value.toFixed(2)))
        .catch(err => console.error(err));
    },[refreshPriceFlag,props.data.performanceId])
    

    return(
        <div className="stock--div">
            <h1 className="stock--name">{props.data.name}</h1>
            <h2 className="stock--ticker">Ticker: {props.data.ticker}</h2>
            <h3 className="stock--price">Price: {price===0?"FETCHING PRICE":"$"+price}</h3>
            <button className="stock--button" onClick={()=>props.removeItem(props.data.id)}>Remove</button>
            <button className="stock--button">Set Reminder</button>
            <button className="stock--button" onClick={()=>{setRefreshPriceFlag(prev=>(!prev))}}>Refresh Price</button>
        </div>
    )
}