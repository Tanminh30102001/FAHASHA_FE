import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import AdminNav from '../../AdminNav';


function Product() {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    quantity: '',
    image: '',
    price: '',
    id_cat: '',
    id_nxb: '',
  });
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  useEffect(() => {
    // Lấy danh mục từ API
    axios.get('http://127.0.0.1:8000/api/category')
      .then(response => {
        console.log("cat:", response.data)
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    // Lấy nhà xuất bản từ API
    axios.get('http://127.0.0.1:8000/api/publisher')
      .then(response => {
        console.log("PUB:",response.data)
        setPublishers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/product/');
      setProducts(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    setCurrentProduct({
      id: '',
      name: '',
      quantity: '',
      image: '',
      price: '',
      id_cat: '',
      id_nxb: '',
    });
  };
  const img= '../../../img'
  const handleChange = (e) => {
    const { name, value } = e.target;
  setCurrentProduct((prevState) => ({
    ...prevState,
    [name]: value,
  }));
    // setCurrentProduct({
    //   ...currentProduct,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    setCurrentProduct((prevState) => ({
      ...prevState,
      image: file,
    }));
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/product', currentProduct);
      toggleModal();
      
      fetchProducts();
      alert('Thêm thành công')
    } catch (error) {
      alert("Thêm thất bại")
      console.log(error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/product/${currentProduct.id}`, currentProduct);
      toggleModal();
      fetchProducts();
      
      console.log("edit oke")
      alert('Sửa thành công')
    } catch (error) {
      alert("Sửa thất bại",error.code)
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/${productId}`);
      
      fetchProducts();
      console.log("xóa oke")
      alert("Xóa Thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setModal(true);
  };
  const getImagePath = (imageName) => {
    const baseUrl = window.location.origin;
    console.log(baseUrl);
    return `${baseUrl}/img/${imageName}`;
    
  };
  getImagePath();

  return (
    <div>
        <AdminNav/>

      <h1>Product Management</h1>
      <Button color="primary" onClick={toggleModal}>Add Product</Button>
      <Row>
        {products.map((product) => (
          
          <Col md="4" key={product.id}>
            <Card>
              <CardImg top src= {`${img}/${product.images}`} alt={product.name} />
              <CardBody>
                <CardTitle>{product.name}</CardTitle>
                <CardText>Quantity: {product.quantity}</CardText>
                <CardText>Price: {product.price}</CardText>
                <CardText>Category ID: {product.id_cat}</CardText>
                <CardText>Publisher ID: {product.id_nxb}</CardText>
                <Button color="primary" onClick={() => handleEditClick(product)}>Edit</Button>{' '}
                <Button color="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add/Edit Product</ModalHeader>
        <ModalBody>
          <Form onSubmit={currentProduct.id ? handleEditProduct : handleAddProduct}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name"  value={currentProduct.name} onChange={(event) => {handleChange(event)}} required />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <Input type="number" name="quantity"  value={currentProduct.quantity} onChange={(event) => {handleChange(event)}} required />
            </FormGroup>
            {/* <FormGroup>
              <Label for="image">Image(only Link img)</Label>
              <Input type="text" name="images" id="image"  onChange={handleChange}  />
            </FormGroup> */}
            <FormGroup>
              <Label for="image">Image(only file)</Label>
              <input type="file" name="file[]" accept='image/*' multiple="multiple" enctype="multipart/form-data"  onChange={(event) => {handleImageChange(event)}}  />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input type="number" name="price"  value={currentProduct.price} onChange={(event) => {handleChange(event)}} required />
            </FormGroup>
            <FormGroup>
              <Label for="id_cat">Category ID</Label>
              <Input type="select" id="categoryId" name="id_cat" value={currentProduct.id_cat} onChange={(event) => {handleChange(event)}} required>
          <option value="">Chọn danh mục</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name} - {category.id}</option>
          ))}
        </Input>
            </FormGroup>
            <FormGroup>
              <Label for="id_nxb">Publisher ID</Label>
              <Input type="select" id="publisherId" name="id_nxb" value={currentProduct.id_nxb} onChange={(event) => {handleChange(event)}} required>
          <option value="">Chọn nhà xuất bản</option>
          {publishers.map(publisher => (
            <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
          ))}
        </Input>
            </FormGroup>
            <Button type="submit" color="primary">{currentProduct.id ? 'Update' : 'Add'}</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Product