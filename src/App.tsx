import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './contexts/SessionContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import About from './pages/About';

function App() {
  return (
    <SessionProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App;
