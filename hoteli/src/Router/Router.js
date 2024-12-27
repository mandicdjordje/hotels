import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LogIn from './AuthPages/LogIn';
import Register from './AuthPages/Register';
import Layout from './Layout';
import CreateAdmin from './Admin/CreateAdmin';
import DeleteAdmin from './Admin/DeleteAdmin';
import SignOut from './AuthPages/SignOut';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/homePage" index element={<HomePage />} />
          <Route path="/createAdmin" element={<CreateAdmin />} />
          <Route path="/deleteAdmin" element={<DeleteAdmin />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signOut" element={<SignOut />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

