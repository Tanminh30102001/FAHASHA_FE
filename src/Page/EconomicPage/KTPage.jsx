import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button,CardText } from "reactstrap";
import { Link } from 'react-router-dom'
import Header from '../../Component/Header/Header';
import Searchbar from '../../Component/Search/Searchbar';
import Footer from '../../Component/Footer/Footer';
function Kidbooks( {addToCart}) {
  const [items,setItems]=useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/product/getbycat', { "name":"Kinh tế" });  
      setItems(response.data.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddToCart =(product)=>{
    addToCart(product);
  }
  return (
    <div>
      <Header/>
      <Searchbar/>
      <Container> 
        <h1> Sách Kinh Tế </h1>
      <Row xs="1" sm="2" md="3" lg="4" className="custom-card-container">
        {items.map((product) => (
          <Col key={product.id} className="custom-card-wrapper">
            <Card className="custom-card">
              <CardImg top src={product.image} alt={product.name} className="custom-card-img" />
              <CardBody>
                <CardTitle tag="h7">{product.name}</CardTitle>
                <CardText className="card-price">{product.price}</CardText>
                <Button onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Footer/>
    </div>
  )
}

export default Kidbooks