import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import ShowPage from './pages/ShowPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/show" element={<ShowPage />} />
        <Route path="/gracias" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;