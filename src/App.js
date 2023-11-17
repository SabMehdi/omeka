import logo from './logo.svg';
import './App.css';
import ItemCards from './ItemsCards';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasicExample from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './User';
import ResourceTemplates from './ResourceTemplates';

function App() {
  return (
    <BrowserRouter>
      <BasicExample />
      <Routes>
        <Route path='/resource' Component={ResourceTemplates} />
        <Route path='/' Component={ItemCards} />
        <Route path='/user' Component={User} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
