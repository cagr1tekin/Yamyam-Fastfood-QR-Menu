import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Categories from '../Pages/Categories';
import Burgers from '../Pages/Burgers';
import Drinks from '../Pages/Drinks';
import Burritos from '../Pages/Burritos';
import ByProducts from '../Pages/ByProducts';
import Sauces from '../Pages/Sauces';
import Layout from './Layout';
import Menus from '../Pages/Menus';
import Dashboard from '../ProjectManagment/dashboard';
import FoodPage from '../ProjectManagment/FoodPage';
import Login from '../ProjectManagment/Login';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/Login" />;
};

function Content() {
  return (
    <>
    <Router >
      <Layout>
        <Routes>
          <Route path="/" element={<Categories />}/>
          <Route path="/Menus" element={<Menus />}/>
          <Route path="/Burritos" element={<Burritos />}/>
          <Route path="/Burgers" element={<Burgers />}/>
          <Route path="/ByProducts" element={<ByProducts />}/>
          <Route path="/Drinks" element={<Drinks />}/>
          <Route path="/Sauces" element={<Sauces />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}/>
          <Route path="/:type" element={<FoodPage />}/>
        </Routes>
      </Layout>
    </Router>
    </>
    
  )
}

export default Content