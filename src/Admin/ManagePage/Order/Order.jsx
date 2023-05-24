import React ,{useState}from 'react'
import Container from 'react-bootstrap/Container';
import {  Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AdminNav from '../../AdminNav';
import axios from 'axios';

function Order() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleViewOrder = () => {
    axios.post('http://127.0.0.1:8000/api/oder/getbyname', { userName })
    .then((response) => {
      setOrderInfo(response.data);
      setError(null);
      console.log(response.data)
    })
    .catch((error) => {
      setError(error.message);
      setOrderInfo(null);
    });
  };  
  return (
    <div>
     <AdminNav/>
     {error && <Alert color="danger">Có lỗi xảy ra: {error}</Alert>}
      <Container>
      <h1>Xem thông tin đơn hàng</h1>
      <Form>
        <FormGroup>
          <Label >Tên người dùng:</Label>
          <Input type="text"  value={userName} onChange={handleUserNameChange} />
        </FormGroup>
        <Button color="primary" onClick={handleViewOrder}>Xem đơn hàng</Button>
      </Form>

      {orderInfo && (
        <div>
          <h2>Thông tin đơn hàng</h2>
          <Row>
            <Col>
              <p>Tên người dùng: {orderInfo.payment}</p>
              <p>Mã đơn hàng: {orderInfo.delivery}</p>
              <p>Sản phẩm: {orderInfo.id_oders}</p>
              <p>Ngày đặt hàng: {orderInfo.id_prd}</p>
              <p>Địa chỉ: {orderInfo.address}</p>
              <p>Số điện thoại: {orderInfo.sdt}</p>

              {/* Hiển thị thông tin đơn hàng khác theo định dạng của bạn */}
            </Col>
          </Row>
        </div>
      )}
      </Container>
      
      
      </div>
  )
}

export default Order