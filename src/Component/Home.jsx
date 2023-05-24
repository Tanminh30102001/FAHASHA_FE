import React from 'react'
import Header from './Header/Header'
import Searchbar from './Search/Searchbar'
import NavBarr from './Navbar/NavBarr' 
import Slider from './Slider/Slider'
import TabKidBooks from './Tab/TabKidBooks'
import Footer from './Footer/Footer'
import '../Component/Home.css'
import TabFB from './Tab/TabFB'
import TabKT from './Tab/TabKT'
import TabNovel from './Tab/TabNovel'
import TabTN from './Tab/TabTN'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
const isLoggedIn =localStorage.getItem("isLoggedIn");
if(isLoggedIn){
  toast.success("Đăng nhập thành công");
}
  return (
    <div className='back-ground'>
        <ToastContainer/>
        <Header/>
        <Searchbar/><br></br>
        <Slider/><br></br>
        <NavBarr/><br></br>
        <TabKidBooks/><br></br>
        <TabFB/><br></br>
        <TabKT/><br></br>
        <TabNovel/><br></br>
        <TabTN/><br></br>
        <Footer/>
    </div>
  )
}

export default Home