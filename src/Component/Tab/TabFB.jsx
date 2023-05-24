
import './Tab.css'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardText, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
function TabFB() {

  const [items,setItems]=useState([]);
    const sliceItem=items.slice(0,5);
    useEffect(() => {
      fetchData();
    }, []);
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/product/getbycat', { "name":"FOREGIN BOOKS" });  
        setItems(response.data.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }

    }
  return (
    <> 
    <Container className='bg-light border'> 
    <h1> Foregin Book</h1>
    </Container>
    <Container className='bg-light border'>
        <div className='card-container'>
      {sliceItem.map((value)=>{
        return(
        <div key={value.id} className='card'> 
        <img src={value.img} alt={value.name} className='card-img'/>
        <div className='card-body'>
            <h3 className='card-title'> {value.name}</h3>
        </div>
        </div>
      )})}
       </div>
       <div className='bottom-tab'> <button className='button'> <Link to='/fbpage'>  Xem Thêm</Link>  </button> </div>
       
    </Container>
    
     </>
    
  )
}

export default TabFB