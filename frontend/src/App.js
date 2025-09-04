import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FormPage from './FormPage';
import './FormPage.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
  <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
