import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Header from '../../Component/Header/Header';
import Searchbar from '../../Component/Search/Searchbar';
import Footer from '../../Component/Footer/Footer';
import  './Checkout.css'
import { Table, FormGroup, Label, Input, Button, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
function Checkout({ cartItems,totalQuantity }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log(cartItems)
    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLogged');
  
      if (isLoggedIn) {
        setIsLogged(true);
      } else {
        setIsOpenModal(true);
      }
    }, []);
  
    const handleModalClose = () => {
      setIsOpenModal(false);
    };
    
    const id_user = localStorage.getItem('id_user');
    const token = localStorage.getItem('token');
    const config = {
      headers: {
       'token': ` ${token}`
      }
    };
    const payload = {
      id_user: id_user,
      
      products: cartItems.map(item => ({
        "id_prd": item.id,
        "quantity": item.quantity
      })),
      sđt:phone,
      address:address,
      payment: paymentMethod
    };
    const handleCheckout=async()=>{
      const response = await axios.post('http://127.0.0.1:8000/api/oder', payload, config);
      try{
      if (response.status === 200) {
        // Thành công, xử lý logic sau khi checkout thành công
        console.log('Checkout successful');
      } else {
        // Xử lý lỗi nếu có
        console.log('Error during checkout');
      }
    } catch (error) {    
      console.log('Error during checkout:', error);
    }
    }
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
       
      <Header/>
      <Searchbar/>
      <Container>
      <br></br>
      <div className="checkout-container">
      <div className="cart-items">
      <Modal isOpen={isOpenModal} toggle={handleModalClose}>
        <ModalHeader toggle={handleModalClose}>Thông báo</ModalHeader>
        <ModalBody>
          <h3 className='text-danger'>Bạn cần đăng nhập để thanh toán</h3>
        </ModalBody>
        <div className="modal-footer">
          <Button color="secondary" onClick={handleModalClose}>Đóng</Button>
          <Button color='success'> <Link to="/signin" style={{textDecoration:'none',color:'white'}}>Đăng Nhập </Link> </Button>
        </div>
      </Modal>
      <Table>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        
       
      </div>
      <div>
      
       
</div>
<div className="checkout-summary">
      <div className='total-cart-form'>  
     <div className='title-cart-page-left'>Thành Tiền   </div>
     <div className='total-price'>  {totalPrice} đ  </div>
     </div>

        <h2>Phương thức thanh toán</h2>
        <FormGroup>
          <Input
            type="select"
            name="paymentMethod"
            id='payment'
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="">Chọn phương thức thanh toán</option>
            <option value="COD">Thanh toán khi nhận hàng</option>
            <option value="creditCard">Thẻ tín dụng</option>
          </Input>
        </FormGroup>

        <button onClick={handleCheckout}>Thanh toán</button>
      </div>
</div>
<label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
  

</Container>
<br></br>
<Footer/>
    </div>

  )
}

export default Checkout