// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Write = lazy(() => import('./pages/Write'));
const WritePage = lazy(() => import('./pages/WritePage'));
const FinalPage = lazy(() => import('./pages/FinalPage'));
const ImageSelection = lazy(() => import('./pages/ImageSelection'));
const FinalPageWithCover = lazy(() => import('./pages/FinalPageWithCover'));
const VoiceSelection = lazy(() => import('./pages/VoiceSelection'));
const WriteStoryPage = lazy(() => import('./pages/WriteStoryPage'));
const ReadPage = lazy(() => import('./pages/ReadPage'));
const ReadStoryPage = lazy(() => import('./pages/ReadStoryPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const TestPage = lazy(() => import('./pages/TestPage'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/write/:page" element={<WritePage />} />
          <Route path="/final" element={<FinalPage />} />
          <Route path="/imageSelection" element={<ImageSelection />} />
          <Route path="/finalCover" element={<FinalPageWithCover />} />
          <Route path="/voiceSelection" element={<VoiceSelection />} />
          <Route path="/writeStory/:storyId" element={<WriteStoryPage />} />
          <Route path="/read" element={<ReadPage />} />
          <Route path="/read/:storyId" element={<ReadStoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
