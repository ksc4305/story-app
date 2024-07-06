import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Write from './pages/Write';
import Write1 from './pages/Write_1';
import Write2 from './pages/Write_2';
import Write3 from './pages/Write_3';
import Write4 from './pages/Write_4';
import Write5 from './pages/Write_5';
import Write6 from './pages/Write_6';
import Write7 from './pages/Write_7';
import Write8 from './pages/Write_8';
import Write9 from './pages/Write_9';
import Write10 from './pages/Write_10';
import FinalReview from './pages/FinalReview';
import ImageSelection from './pages/StartImageSelection';
import ReadPage from './pages/ReadPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { StoryProvider, useStory } from './contexts/StoryContext';

import './App.css';

function RouteChangeHandler() {
    const { clearOptions } = useStory();
    const location = useLocation();
  
    React.useEffect(() => {
      const clearRoutes = ['/', '/write', '/read', '/login'];
      if (clearRoutes.includes(location.pathname)) {
        clearOptions();
      }
    }, [location, clearOptions]);
  
    return null;  // 이 컴포넌트는 시각적인 출력을 하지 않습니다.
  }

function App() {
    return (
        <StoryProvider>
            <Router>
                <Header />
                <RouteChangeHandler />  {/* 라우트 변경 핸들러를 추가 */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/write1" element={<Write1 />} />
                    <Route path="/write2" element={<Write2 />} />
                    <Route path="/write3" element={<Write3 />} />
                    <Route path="/write4" element={<Write4 />} />
                    <Route path="/write5" element={<Write5 />} />
                    <Route path="/write6" element={<Write6 />} />
                    <Route path="/write7" element={<Write7 />} />
                    <Route path="/write8" element={<Write8 />} />
                    <Route path="/write9" element={<Write9 />} />
                    <Route path="/write10" element={<Write10 />} />
                    <Route path="/finalReview" element={<FinalReview />} />
                    <Route path="/imageSelection" element={<ImageSelection />} />
                    <Route path="/read" element={<ReadPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
                <Footer />
            </Router>
        </StoryProvider>
    );
}

export default App;
