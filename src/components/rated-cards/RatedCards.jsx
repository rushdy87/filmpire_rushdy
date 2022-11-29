import { Typography, Box } from '@mui/material';

import { Movie } from '..';
import { Container } from './styles';

const RatedCards = ({ title, data }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Container>
        {data?.results.map((movie, index) => (
          <Movie key={movie.id} movie={movie} index={index} />
        ))}
      </Container>
    </Box>
  );
};

export default RatedCards;
