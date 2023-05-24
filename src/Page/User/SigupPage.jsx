import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Login.css'
function SignUpPage() {
  const history = useNavigate();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'confirm_password') {
      setPasswordMismatch(e.target.value !== password);
    }
    if (e.target.name === 'password') {
      setPasswordMismatch(e.target.value ==='');
    }

  };
  const { name, email, password,confirm_password} = formData;
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
      name:formData.name,
      email:formData.email,
      password:formData.password

  }
  if (password !== confirm_password) {
    setPasswordMismatch(true); // Thiết lập trạng thái passwordMismatch khi xảy ra lỗi
    return;
  }
    
    axios.post('http://127.0.0.1:8000/api/user/register',sendData)
    .then(res=>{
      if(res.status===200){

      
      // const token= res.data.token;
      localStorage.setItem('user-info',JSON.stringify(res));
      
      history('/signin')
      alert('Đăng ký Thành công')
      }
      else{
        alert(res.data.error)
      }
    }).catch(error=>{
      alert("Đã xãy ra lỗi vui lòng thử lại",error)
      console.error(error)})
   
    // localStorage.setItem('user', JSON.stringify(formData));
    // history('/profile');
  };
  const isDisabled = password !== confirm_password;
  return (
    <div className=' col-sm-6 offset-sm-3'>
      <h1>Đăng ký</h1>
      <Form>
        <FormGroup>
          <Label for="name">Tên</Label>
          <Input type="text" name="name" id="name" value={name} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={email} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Mật khẩu</Label>
          <Input type="password" name="password" id="password" 
          value={password} onChange={handleChange} 
          className={passwordMismatch ? 'error' : ''}
          />
          {passwordMismatch && <div className="error-message">Mật khẩu không được để trống </div>}
        </FormGroup>
        <FormGroup>
          <Label for="confirm_password">Nhập lại mật khẩu</Label>
          <Input type="password" name="confirm_password" id="confirm_password" value={confirm_password}
           onChange={handleChange} 
           className={passwordMismatch ? 'error' : ''}
           />
           {passwordMismatch && <div className="error-message">Mật khẩu không khớp</div>}
        </FormGroup>
        <p>Bạn đã có tài khoản? Ấn vào đây để <Link to="/signin">Đăng nhập</Link>  </p>
        <Button color="primary" disabled={isDisabled} onClick={handleSubmit}>
          Đăng ký
        </Button>
      </Form>
    </div>
  );
}

export default SignUpPage;
