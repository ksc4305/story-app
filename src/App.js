import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Write from './pages/Write';
import WritePage from './pages/WritePage';
import FinalPage from './pages/FinalPage';
import ImageSelection from './pages/ImageSelection'; // ImageSelection 페이지 추가
import FinalPageWithCover from './pages/FinalPageWithCover'; // FinalPageWithCover 페이지 추가
import VoiceSelection from './pages/VoiceSelection'; // VoiceSelection 페이지 추가
import WriteStoryPage from './pages/WriteStoryPage'; // WriteStoryPage 페이지 추가
import ReadPage from './pages/ReadPage';
import ReadStoryPage from './pages/ReadStoryPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import TestPage from "./pages/TestPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/:page" element={<WritePage />} /> {/* 동적 라우팅 */}
        <Route path="/final" element={<FinalPage />} /> {/* final 페이지 */}
        <Route path="/imageSelection" element={<ImageSelection />} /> {/* ImageSelection 페이지 추가 */}
        <Route path="/finalCover" element={<FinalPageWithCover />} /> {/* FinalPageWithCover 페이지 추가 */}
        <Route path="/voiceSelection" element={<VoiceSelection />} /> {/* VoiceSelection 페이지 추가 */}
        <Route path="/writeStory/:storyId" element={<WriteStoryPage />} /> {/* WriteStoryPage 페이지 추가 */}
        <Route path="/read" element={<ReadPage />} />
        <Route path="/read/:storyId" element={<ReadStoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
