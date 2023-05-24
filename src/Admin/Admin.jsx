import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';

function Admin() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
      });
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const [error, setError] = useState("");
      const navigate=useNavigate()
      const handleSubmit = async (event) => {
        const sendData = {
          
          name:formData.name,
          password:formData.password
    
      }
        event.preventDefault();
        try {
          axios.post('http://127.0.0.1:8000/api/admin/login',sendData)
          .then(res=>{ 
           console.log(JSON.stringify(res.config.data)) 
            navigate("/Dashboard")
          })
        } catch (error) {
          console.log(error)
          setError("Invalid username or password");
        }
      };

  return (
    <div>

<Container >
        {error && <p>{error}</p>}
      
     
      <div className=' col-sm-6 offset-sm-3'>
      <h1>Login Admin </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" className='form-control' value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" className='form-control' value={formData.password} onChange={handleChange} required/><br></br>
        </div>
        <button type="submit" class="btn btn-success" >Sign In</button>
      </form>
    </div>

    </Container>
    </div>
  )
}

export default Admin