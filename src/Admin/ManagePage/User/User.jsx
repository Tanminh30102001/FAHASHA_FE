import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import AdminNav from '../../AdminNav';
function User() {
  const [user,setUser]=useState([])

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/user')
      .then(res => setUser(res.data))
      .catch(e => console.log(e))
  })

  return (
    <div>
      <AdminNav/>
      <Container>
      <Table>
              <thead>
                <tr>
                  <th>
                    id
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    Adress
                  </th>
                  <th>
                    SĐT
                  </th>
                </tr>
              </thead>
              <tbody>

                {user.map((item, index) => {
                  return <tr key={index}>
                    <td> {item.id}</td>
                    <td> {item.name}</td>
                    <td> {item.email}</td>
                    <td> {item.address}</td>
                    <td> {item.sdt}</td>
                    <td>
                     
                    </td>
                  </tr>

                })}
                <tr>
                </tr>

              </tbody>
            </Table>

      </Container>
      </div>
  )
}

export default User