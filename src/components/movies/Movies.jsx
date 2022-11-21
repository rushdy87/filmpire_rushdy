import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';

import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const { data } = useGetMoviesQuery();
  console.log(data);
  return <div>Movies</div>;
};

export default Movies;
