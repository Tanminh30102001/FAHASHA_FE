
import { BrowserRouter as Router, Route, Routes,redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Component/Home';
import { useState,useEffect  } from "react";
import CartPage from "./Page/Cart/CartPage";
import SignInPage from "./Page/User/SignInPage";
import ProfilePage from "./Page/User/ProfilePage";
import SignUpPage from "./Page/User/SigupPage";

import KTPage from "./Page/EconomicPage/KTPage"
import FBpage from "./Page/ForeignBook/FBpage"
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Dashboard";
import Product from "./Admin/ManagePage/Product/Product";
import Category from "./Admin/ManagePage/Category/Category";
import Order from "./Admin/ManagePage/Order/Order";
import User from "./Admin/ManagePage/User/User";
import NotFound from "./Page/NotFound";
import Publisher from "./Admin/ManagePage/Publisher/Publisher";
import Kidbooks from "./Page/KidBooks/Kidbooks";
import Allproduct from "./Page/AllProduct/Allproduct";
import Checkout from "./Page/Checkout/Checkout";
import Novel from "./Page/Novel/Novel";
import TrongNuoc from "./Page/TrongNuoc/TrongNuoc";
import ProductDetails from "./Page/ProductDetails/ProductDetails";
function App() {
  
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      console.log(localStorage.getItem('cartItems'))
      setTotalQuantity(totalQuantity + 1);
      
      alert("Thêm sản phẩm thành công")
    } else {
      const newItems={ ...product, quantity: 0 };
      setCartItems([...cartItems, newItems]);
      
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, newItems]));

    }
  };
  const updateQuantity = (productId, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        
        return { ...item, quantity: item.quantity + quantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);
    setTotalQuantity(totalQuantity - 1);
    
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));

  };
  // const increaseQuantity = (productId) => {
  //   const updatedCartItems = cartItems.map((item) => {
  //     if (item.id === productId) {
  //       return { ...item, quantity: item.quantity + 1 };
  //     }
  //     return item;
  //   });
  //   setCartItems(updatedCartItems);
  //   setTotalQuantity(totalQuantity + 1);
   
  // };
  const increaseQuantity = (productId) => {
    updateQuantity(productId, 1);
    setTotalQuantity(totalQuantity+1)
    
  };
  const decreaseQuantity = (productId) => {
    updateQuantity(productId, -1);
    setTotalQuantity(totalQuantity-1)
    
  };
  const clearCart = () => {
    setCartItems([]);
    setTotalQuantity(0);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalQuanity');
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>       
       <Route path="/" element={<Home/>}/>
       
       <Route path="/profile" element={<ProfilePage/>}/>
       <Route path="/signup" element={<SignUpPage/>}/>
       <Route path="/signin" element={<SignInPage/>}/>
       <Route path="/cart" element={<CartPage cartItems={cartItems}
        removeFromCart={removeFromCart}
         clearCart={clearCart}
          totalQuantity={totalQuantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          />}/>
       <Route path="/kid" element={<Kidbooks addToCart={addToCart}/>}/>
       <Route path="/allproduct" element={<Allproduct addToCart={addToCart}/>}/>
       <Route path="/checkout" element={<Checkout cartItems={cartItems} totalQuantity={totalQuantity}/>}/>
       <Route path="/economic" element={<KTPage addToCart={addToCart} />} />
       <Route path="/fbpage" element={<FBpage addToCart={addToCart}/>}/>
       <Route path="/novel" element={<Novel addToCart={addToCart}/>}/>
       <Route path="/noidia" element={<TrongNuoc addToCart={addToCart}/>}/>
       <Route path="/products/:productId" element={<ProductDetails/>} />
       <Route path="*" element={<NotFound/>}/>
      {/* --- ----------------------------*/}
       <Route path="/adminn" element={<Admin/>}/>
       <Route path="/Dashboard" element={<Dashboard/>}/>
       <Route path="/product" element={<Product/>}/>
       <Route path="/category" element={<Category/>}/>
       <Route path="/Order" element={<Order/>}/>
       <Route path="/user" element={<User/>}/>
       <Route path="/Pub" element={<Publisher/>}/>



   </Routes>
  );
}

export default App;
