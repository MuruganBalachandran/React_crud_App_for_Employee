import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmpList from './emplist'; 
import EmpCreate from './empcreate';
import EmpEdit from './empedit';
import EmpDetails from './empdetails';

function App() {
  return (
    <div className="App">
      <h1>Reactjs CRUD app</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpList />} /> 
          <Route path='/employee/create' element={<EmpCreate />} /> 
          <Route path='/employee/edit/:empid' element={<EmpEdit />} /> 
          <Route path='/employee/details/:empid'element={<EmpDetails />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;