import React, { useEffect, useState } from 'react'
import { Container,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Navbarr.css'
function NavBarr() {
  const [data,setData]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/category'); // Gọi API để lấy dữ liệu
        setData(response.data); // Đặt dữ liệu vào trong state
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData(); // Gọi hàm fetch data trong useEffect để lấy dữ liệu khi component được gắn vào DOM
  }, []);

  return (
    <>  
    <Container>
        <span className='icon-nav'> </span>
        <span className='text-nav'> Danh mục sản phẩm </span>
      </Container>
      <Container >
        <div className='menu-categories-container'>  
           
           {data.map(item=>(
            <div key={item.id} className='card-of-categories'> 
            <h2 className='name-card-of-categories' > {item.name} </h2>
            </div>
           ))}
          
        </div>
        <div className='bottom-nav'><button className='button-getall'> <Link to="/allproduct"> Xem tất cả sản phẩm</Link></button>  </div>
      </Container>
    </>
    
    
  )
}

export default NavBarr