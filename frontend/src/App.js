import React, { useState } from 'react';
import './main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navmenu from './components/navmenu/Navmenu';
import Footer from './components/footer/Footer';

import Main from './pages/Main';
import Assortment from './pages/Assortment';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Profile from './pages/Profile'
import Cart from './pages/Cart';
import Order from './pages/Order';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div>
      <BrowserRouter>
      <Navmenu isAuth={ isAuth }/>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/assortment' element={<Assortment />} />
        <Route path='/about' element={<About />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;