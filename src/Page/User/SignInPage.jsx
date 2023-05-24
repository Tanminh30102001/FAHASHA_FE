import React, { useState,useEffect } from 'react';
import './Login.css'
import { Container, Form, FormGroup, Label, Input, Button, Alert,Row,Col } from 'reactstrap';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.name === 'password') {
      setPasswordMismatch(e.target.value ==='');
    }
  };
  
  

  const navigate=useNavigate()
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      axios.post('http://127.0.0.1:8000/api/user/login',{email,password})
      .then(res=>{
      //  
        if(res.data.message === "Login Fail"){
          console.log("đăng nhập thất bại");
          alert('Đăng nhập thất bại')
          setError('Đăng nhập thất bại');
        }else{
          toast('Đăng nhập thành công');
          console.log(JSON.stringify(res.config.data))       
       console.log(res.data);
        localStorage.setItem('token',res.data.data.remember_token);
        localStorage.setItem('isLoggedIn',true);
        localStorage.setItem('userName',res.data.data.name);
        localStorage.setItem('id_user',res.data.data.id);
        console.log(res.data.data.name)
        console.log(res.data.message)
        navigate("/")
        }
        
      })
    } catch (error) {
      console.log(error)
      alert('Đăng nhập thất bại')
      setError('Đăng nhập thất bại');
    }
  };
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  const isDisabled = password === '';

  
  return (
    <div> 
      
    <Container >
       
      <Row className='login-form'>
    <Col
      className="bg-light border"
      md={{
        offset: 3,
        size: 6
      }}
      sm="12"
    >
     <Container>
      <h2>Đăng nhập</h2>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
      {error && <div style={{textAlign:"center",fontSize:"20px"}} className='text-danger'>  {error}</div>}
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Nhập email của bạn"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Mật khẩu:</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Nhập mật khẩu của bạn"
            className={passwordMismatch ? 'error' : ''}
          />
          {passwordMismatch && <div className="error-message">Mật khẩu không được để trống</div>}
          <p>Bạn chưa có tài khoản? Ấn vào đây để <Link to="/signup">Đăngký</Link>  </p>
        </FormGroup>
        <Button color="primary" type="submit" disabled={isDisabled} className={isDisabled ? 'button-disabled' : ''}>
          Đăng nhập
        </Button>
      </Form>
    </Container>
    </Col>
  </Row>
  <Row></Row>
    </Container>
    
    </div>
  );
}

export default SignInPage;


//SignInPage


