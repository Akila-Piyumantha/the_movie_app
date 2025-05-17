import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';

const DetailPage = () => {
  const { id } = useParams();
  
  return <MovieDetail movieId={id} />;
};

export default DetailPage;