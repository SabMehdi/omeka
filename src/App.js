import logo from './logo.svg';
import './App.css';
import ItemCards from './ItemsCards';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasicExample from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './User';
import ResourceTemplates from './ResourceTemplates';
import Login from './Login';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <BasicExample />
      <Routes>
        <Route path='/resource' element={<ResourceTemplates />} />
        <Route path='/' element={<ItemCards />} />
        <Route path='/user' element={<User />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
