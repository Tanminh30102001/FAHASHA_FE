import React, { useState,useEffect } from 'react'
import { Container,Row,Col,Input } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Searchbar.css'
import logo from '../../img/fahasa_logo.png'

function Searchbar({totalQuantity}) {
   const navigate = useNavigate();
   const [userName, setUserName] = useState('');

  useEffect(() => {
    // Lấy tên người dùng từ LocalStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
   function handleClick(e){
      e.preventDefault();

      if(!localStorage.getItem("isLoggedIn")){
         navigate("/signin")
      }
      else 
      {
         navigate("/profile")
      }
      console.log(localStorage.getItem("isLoggedIn"))
      

   }

  return (
    <div className='wrapper'>  
    <Container >
    <Row xs="3">
    <Col xs="2" className='logo' > 
    <Link to="/">
     <img src={logo}/>
     </Link>
    </Col>
    <Col xs="8" >
    
        <div className='search-box'>    
        <i class="fa-sharp fa-light fa-list-dropdown"></i>     
           <input  type="text" name="" id="" placeholder='Nhập sản phẩm cần tìm' /> 
           <button className='btn btn-success'> <i className='fa fa-search fa-2x'></i>   </button>
        </div>   
    </Col>
    <Col xs="2">
       <div className='icon '> 
        {/* <div className='icon-bell'>  <i className='fa fa-bell fa-2x'></i> <span>0</span></div> */}
        <div className='icon-user'>  <button onClick={handleClick} className='btn-user'><Link> <i className='fa fa-user fa-2x'></i>  </Link> <div className="user-name">{userName}</div></button>  </div>
        <div className='icon-cart'> <Link to="/cart">  <i className='fa fa-shopping-cart fa-2x'></i><span>{totalQuantity}</span>  </Link></div>
       </div>
    </Col>
    
  </Row>
  </Container>
     </div>
    
    
  )
}

export default Searchbar