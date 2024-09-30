import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LogIn from './AuthPages/LogIn';
import Register from './AuthPages/Register';
import Layout from './Layout';

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/homePage' index element={<HomePage />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path='/logOut'></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
