import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Users from './pages/Usuarios/Users.js';
import Colegios from './pages/Colegios/Colegios.js';
import Programas from './pages/Programas/Programas.js';
import Test from './pages/Test/Test.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/users' element={<Users />} /> 
        <Route path='/colegios' element={<Colegios />} />
        <Route path='/programas' element={<Programas />} />
        <Route path='/test' element={<Test />} />

      </Routes>
    </BrowserRouter>
    

  );

}

export default App;
