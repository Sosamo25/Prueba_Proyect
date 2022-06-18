import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Usuarios/Users.js';
import Colegios from './pages/Colegios/Colegios.js';
import Programas from './pages/Programas/Programas.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/users' element={<Users />} /> 
        <Route path='/colegios' element={<Colegios />} />
        <Route path='/programas' element={<Programas />} />

      </Routes>
    </BrowserRouter>
    

  );

}

export default App;
