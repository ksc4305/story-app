import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Write from './pages/Write';
import WritePage from './pages/WritePage';
import FinalPage from './pages/FinalPage';
import ReadPage from './pages/ReadPage';
import ReadStoryPage from './pages/ReadStoryPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';
import ImageSelection from "./pages/ImageSelection";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/:page" element={<WritePage />} /> {/* 동적 라우팅 */}
        <Route path="/images" element={<ImageSelection />} />
        <Route path="/final" element={<FinalPage />} /> {/* final 페이지 */}
        <Route path="/read" element={<ReadPage />} />
        <Route path="/read/:storyId" element={<ReadStoryPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
