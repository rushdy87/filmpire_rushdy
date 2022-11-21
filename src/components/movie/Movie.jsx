import { useNavigate } from 'react-router-dom';
import { Box, Grid, Grow, Rating, Tooltip } from '@mui/material';
import { Img, Links, Title } from './styles';

const Movie = ({ movie, index }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} p={'10px'}>
      <Links onClick={() => navigate(`/movie/${movie.id}`)}>
        <Title className="title" variant="h5">
          {movie.title}
        </Title>
      </Links>
    </Grid>
  );
};

export default Movie;
