import {useEffect, useState } from 'react'
import '../App.css'
import jsonData from '../components/JsonData'
import {useNavigate} from "react-router-dom"

export default function List() {
const navigate = useNavigate();
const pageSize = 5
const [currentPage,setCurrentPage] = useState(1);

  const [isMode,setIsMode] = useState(false)


   // Calculate the indexes for the current page:
  let startIndex = (currentPage-1) * pageSize;
  let endIndex = startIndex + pageSize
  let currentItems = jsonData.slice(startIndex,endIndex);

 // Handle pagination button clicks
  const handlePageChange=(newPage)=>{
    setCurrentPage(newPage)
  }

  const handleModeChange =()=>{
    setIsMode(!isMode)
  }


useEffect(()=>{
  let data = JSON.parse(localStorage.getItem("user"))
if(!data){
  navigate("/")
}
})
  
  return (
    <main className={isMode ? "dark" : "light"}>
      <label>Dark mode/Light mode</label>
      <input 
        type="checkbox"
        checked={isMode}
        onChange={handleModeChange}
      /><br/><br/>
    
      
      <ul>
      {
        currentItems.map((items,i)=>(
          <li key={i}>{items.todo}</li>
        ))
      }

        <div className='pagination'>
        {Array.from({ length: Math.ceil(jsonData.length / pageSize) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )
        )}
        </div>
        </ul>
    </main>
  )
}
