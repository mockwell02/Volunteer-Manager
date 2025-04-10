import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Volunteers } from './pages/Volunteers';
import { Events } from './pages/Events';
import { Programs } from './pages/Programs';
import { Groups } from './pages/Groups';
import { Reports } from './pages/Reports';
import { Communication } from './pages/Communication';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/events" element={<Events />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/communication" element={<Communication />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;