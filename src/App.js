import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Write from './pages/Write';
import CoverSelection from './pages/CoverSelection';
import StoryEdit from './pages/StoryEdit';
import StorySummary from './pages/StorySummary';
import VoiceSelection from './pages/VoiceSelection';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/cover-selection" element={<CoverSelection />} />
        <Route path="/story-edit" element={<StoryEdit />} />
        <Route path="/story-summary" element={<StorySummary />} />
        <Route path="/voice-selection" element={<VoiceSelection />} />
        <Route path="/login" element={<LoginPage />} />
        {/* 다른 페이지들에 대한 라우트 추가 */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
