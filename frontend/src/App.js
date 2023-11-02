import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subcategory from './components/Subcategory/Subcategory';
import AllProduct from './components/Product/AllProduct';
import SingleProduct from './components/Product/SingleProduct';
import MyCart from './components/cart/MyCart';
import CategoryComp from './components/category/CategoryComp';
import HeaderComp from './components/main/HeaderComp';
import Footer from './components/main/Footer';
import Home from './components/Collections/Home';
import Collection from './components/Collections/Collection';
import CheckoutSuccess from './components/cart/CheckoutSuccess';
import Login from './components/auth/Login';


function App() {
  return (
    <div className="App">
      <Router>
      <HeaderComp/>
        <Routes>
        <Route path='/'element={<Collection/>}/>
          <Route path='/subcategory/:category_id' element={<Subcategory/>}/>
          <Route path='/singleproduct/:product_id' element={<SingleProduct/>}/>
          <Route path='/cart' element={<MyCart/>}/>
          <Route path='/success' element={<CheckoutSuccess/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
