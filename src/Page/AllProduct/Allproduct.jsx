
import React, { useState, useEffect } from "react";
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button,CardText } from "reactstrap";
import axios from "axios";
import Header from "../../Component/Header/Header";
import NavBarr from "../../Component/Navbar/NavBarr";
import Searchbar from "../../Component/Search/Searchbar";
import Footer from "../../Component/Footer/Footer";
import './Allproduct.css'
import { Link } from "react-router-dom";
function Allproduct({addToCart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu sản phẩm
    axios.get("http://127.0.0.1:8000/api/product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddToCart =(product)=>{
    addToCart(product);
  }
    
  return (
    <div className="back-ground">
      <Header/>
      <Searchbar/>
    <div>
      

      <Container>
      <h1>Tất cả sản phẩm</h1>
      <Row xs="1" sm="2" md="3" lg="4" className="custom-card-container">
        {products.map((product) => (
          <Col key={product.id} className="custom-card-wrapper">
            <Card className="custom-card">
              <CardImg top src={product.image} alt={product.name} className="custom-card-img" />
              <CardBody>
                <CardTitle tag="h7"> <Link to={`/products/${product.id}`} style={{textDecoration:'none'}}> {product.name} </Link></CardTitle>
                <CardText className="card-price">{product.price}</CardText>
                <Button onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</Button>
                
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>

<div className="footer"> <Footer/>   </div>


    </div>
  )
}

export default Allproduct