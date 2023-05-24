import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {  Container } from 'reactstrap';
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'
import Searchbar from '../../Component/Search/Searchbar';
import { FormGroup, Label, Input, Button, Alert,Row,Col } from 'reactstrap';
import axios from 'axios';
function ProfilePage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
    const handleLogout = () => {
      localStorage.clear();
      navigate('/');
    };
    const handleDismiss = () => {
      setUpdateSuccess(false); // Ẩn thông báo khi người dùng nhấp vào nút x
    };
    const userID=localStorage.getItem('id_user')
    const handleUpdateUser = (e) => {
      e.preventDefault();
  
      // Tạo object chứa thông tin người dùng để gửi lên API
      const userData = {
        name: name,
        phone: phone,
        address: address
      };
  
      // Gửi yêu cầu PUT để cập nhật thông tin người dùng
      axios.put(`http://127.0.0.1:8000/api/user/${userID}`,{userData})
        .then(response => {
          // Xử lý kết quả thành công
          console.log(response.data);
          setUpdateSuccess(true); // Đánh dấu là cập nhật thành công
        })
        .catch(error => {
          // Xử lý lỗi
          console.log(error);
        });
  
      // Sau khi gửi API thành công, có thể làm các tác vụ khác như chuyển hướng trang, hiển thị thông báo, vv.
    };
    return (
    <div> 
       {updateSuccess && (
        <Alert color="success" toggle={handleDismiss}>Cập nhật thành công!</Alert>
      )}
      <Header/>
      <Searchbar/>
      <Container>   
        <div className='button-logout'> <Button onClick={()=>{handleLogout()}}> Đăng xuất </Button>    </div>
     
      <Row>
 
    <Col
      className="bg-light border"
      md={{
        offset: 3,
        size: 6
      }}
      sm="12"
    >
      <h1> Cập nhập thông tin</h1>
 <form onSubmit={handleUpdateUser}>
        <FormGroup>
          <Label for="name">Tên</Label>
          <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Số điện thoại</Label>
          <Input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Địa chỉ</Label>
          <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormGroup>
        <Button type="submit" color="primary">Cập nhật</Button>
      </form>
      
    </Col>
  </Row>
     

      </Container>
      <Footer/>
    </div>
      
    );
  }
  
  export default ProfilePage;
