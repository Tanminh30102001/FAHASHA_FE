import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const ProductDetailPage = () => {
    
    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/product/${productID}`);
            setProduct(response.data);
            console.log(response.data)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchProduct();
      }, [productID]);
    
      if (!product) {
        return <div>Loading...</div>;
      }
  return (
    <Container>
      <Row>
        <Col>

          <Card>
            <CardImg top width="100%" src={product.images} alt={product.name} />
            <CardBody>
              <CardTitle tag="h5">{product.name}</CardTitle>
              <CardText>{product.price}</CardText>
              <Button color="primary">Add to Cart</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
