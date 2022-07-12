
import './App.css';

import Test from './Test/Test';

import Inicio_Test from './Login/Inicio/Inicio_Test';
import CompCreateProspects from './Login/Nuevo_Registro_Prospect/CreateProspect';
import Login_Test from './Login/Ingreso_Test_C_Unico/Login_Test';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <header>

      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Inicio_Test/> } />
          <Route path='/Login_Test' element={ <Login_Test /> } />
          <Route path='/Test' element={ <Test /> } />
          <Route path='/CreateProspecto' element={ <CompCreateProspects /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
