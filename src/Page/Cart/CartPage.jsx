
import { Link } from 'react-router-dom';
import { Button,Container,Table,Col,Row } from 'reactstrap';
import './CartPage.css'
import Header from '../../Component/Header/Header';
import Searchbar from '../../Component/Search/Searchbar';
import Footer from '../../Component/Footer/Footer';
import { useEffect } from 'react';

function CartPage({cartItems,removeFromCart,clearCart,totalQuantity,increaseQuantity,decreaseQuantity}) {

 useEffect(() => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log(localStorage.getItem('cartItems'))
  } catch (error) {
    console.error('Lỗi khi lưu giỏ hàng vào localStorage:', error);
  }
}, [cartItems]);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);

    if (item.quantity > 0) {
      decreaseQuantity(itemId);
    }
  };

  return (
    <div className='container-all'>
      
      <Header/>
      <Searchbar totalQuantity={totalQuantity} />
    <Container>
    
    {cartItems.length===0?(
      <div >
        <Row className='no-product-in-cart'>
    <Col
     
      md={{
        offset: 3,
        size: 6
      }}
      sm="12"
    >
      <p> Chưa có sản phẩm nào trong giỏ hàng cả   </p> 
      <Container> <Button className='shopping-now' color='danger'><Link to="/allproduct"> Mua sắm ngay </Link> </Button></Container>
    </Col>
  </Row>
      </div>
    ): (
      
    <div className="cart-page">
      <Link to="/allproduct"> Tiếp tục mua?</Link>
      <h1 className="cart-page-title">Giỏ hàng</h1>
      <p className="cart-page-quantity">Tổng số lượng: {totalQuantity}</p>
      <Table className="cart-page-table">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>  <Button color="primary" onClick={() => increaseQuantity(item.id)}>+</Button> {item.quantity}  <Button color="danger" onClick={() => handleDecreaseQuantity(item.id)}>-</Button></td>
              <td>{item.price * item.quantity}</td>
              <td><Button color='danger' onClick={()=>{removeFromCart(item.id)}}> Xóa</Button></td>
              <td>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="cart-page-total">Tổng tiền: {totalPrice} đ</p>
      <Button color="primary" className='delete-all-button' onClick={clearCart}>Xóa giỏ hàng</Button>
      <Button color="danger" className='checkout-button'><Link to="/checkout" style={{ textDecoration: 'none',color: 'white' }}> Thanh toán</Link> </Button>
      </div>
      )}
    </Container>
    <Footer/>
    </div>
  )
}
export default CartPage