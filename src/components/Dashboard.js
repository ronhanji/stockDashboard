import React,{useState, useEffect} from "react";
import Stock from "./Stock"
import "../styles/Dashboard.css"
import Searchbar from "./Searchbar";
import { useAuth } from "../contexts/AuthContext";
import {getDatabase, ref, get,set} from 'firebase/database'
export default function Dashboard(props){
  const [data,setData] = useState()
  const [selectedItems,setSelectedItems] = useState([])
  const { logout, currentUser} = useAuth()

  const readData = (userId)=>{
    const db = getDatabase();
    const reference= ref(db,'users/' + userId)
    get(reference).then((snapshot) => {
        if (snapshot.exists()) {
          setSelectedItems(snapshot.val().stocks)
        }
    })
  }

  const writeData = (userId, stocks)=>{
    const db = getDatabase();
    const reference= ref(db,'users/' + userId)
    set(reference, {
        stocks
    })
  }

  const removeItem = (itemId) => {
    const temp = selectedItems.filter(val=>val.id!==itemId)
    writeData(currentUser.uid,temp)
    setSelectedItems(temp)
  }
  useEffect(()=>{
    console.log('User ID',currentUser.uid)
    readData(currentUser.uid)
  },[currentUser])
  
  const items = selectedItems.map((item)=>(<Stock key={item.id} data={item} removeItem={removeItem}/>))
  return(
      <div className="dashboard--div">
          <Searchbar data={data} setData={setData} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
          {items}
          <button onClick={logout}>Log Out</button>
      </div>
  )
}