// // // src/App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Home from './pages/Home';
// // import Write from './pages/Write';
// // import Write1 from './pages/Write_1';
// // import WritePage from './pages/WritePage';
// // import FinalReview from './pages/FinalReview';
// // import ImageSelection from './pages/ImageSelection';
// // import ReadPage from './pages/ReadPage';
// // import LoginPage from './pages/LoginPage';
// // import Header from './components/Header';
// // import Footer from './components/Footer';
// // import { StoryProvider } from './contexts/StoryContext';

// // import './App.css';

// // function App() {
// //   return (
// //     <StoryProvider>
// //       <Router>
// //         <Header />
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/write" element={<Write />} />
// //           <Route path="/write1" element={<Write1 />} />
// //           <Route path="/write/:pageNumber" element={<WritePage />} />
// //           <Route path="/finalReview" element={<FinalReview />} />
// //           <Route path="/imageSelection" element={<ImageSelection />} />
// //           <Route path="/read" element={<ReadPage />} />
// //           <Route path="/login" element={<LoginPage />} />
// //         </Routes>
// //         <Footer />
// //       </Router>
// //     </StoryProvider>
// //   );
// // }

// // export default App;
// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Write from './pages/Write';
// import Write1 from './pages/Write_1';
// import WritePage from './pages/WritePage';
// import FinalReview from './pages/FinalReview';
// import ImageSelection from './pages/ImageSelection';
// import ReadPage from './pages/ReadPage';
// import LoginPage from './pages/LoginPage';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import { StoryProvider } from './contexts/StoryContext';

// import './App.css';

// function App() {
//   return (
//     <StoryProvider>
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/write" element={<Write />} />
//           <Route path="/write1" element={<Write1 />} />
//           <Route path="/write/:pageNumber" element={<WritePage />} />
//           <Route path="/finalReview" element={<FinalReview />} />
//           <Route path="/imageSelection" element={<ImageSelection />} />
//           <Route path="/read" element={<ReadPage />} />
//           <Route path="/login" element={<LoginPage />} />
//         </Routes>
//         <Footer />
//       </Router>
//     </StoryProvider>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Write from './pages/Write';
// import Write1 from './pages/Write1';
// import WritePage from './pages/WritePage';
// import FinalPage from './pages/FinalPage'; // final 페이지 추가
// import ImageSelection from './pages/ImageSelection';
import ReadPage from './pages/ReadPage';
import ReadStoryPage from './pages/ReadStoryPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { StoryProvider } from './contexts/StoryContext';

import './App.css';

function App() {
  return (
    <StoryProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/write" element={<Write />} /> */}
          {/* <Route path="/write/1" element={<Write1 />} /> */}
          {/* <Route path="/write/:page" element={<WritePage />} /> 동적 라우팅 */}
          {/* <Route path="/final" element={<FinalPage />} /> final 페이지 */}
          {/* <Route path="/imageSelection" element={<ImageSelection />} /> */}
          <Route path="/read" element={<ReadPage />} />
          <Route path="/read/:storyId" element={<ReadStoryPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </Router>
    </StoryProvider>
  );
}

export default App;
