import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WritePageComponent from '../components/WritePageComponent';

const WritePage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const parsedPage = parseInt(page, 10);
    if (isNaN(parsedPage) || parsedPage < 1 || parsedPage > 10) {
      navigate('/'); // 잘못된 페이지 번호인 경우 홈으로 리다이렉트
    } else {
      setCurrentPage(parsedPage);
    }
  }, [page, navigate]);

  const nextPage = currentPage !== null && currentPage < 10 ? currentPage + 1 : 'final';

  if (currentPage === null) {
    return null; // 페이지 로딩 중
  }

  return <WritePageComponent currentPage={currentPage} nextPage={nextPage} />;
};

export default WritePage;
