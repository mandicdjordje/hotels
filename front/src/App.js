import MainHotelPage from './pages/Hotel/MainHotelPage';
import CreateHotelPage from './pages/Hotel/CreateHotelPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/ui/AppLayout';

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MainHotelPage />} />
          <Route path="/CreateHotel" element={<CreateHotelPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};
export default App;
