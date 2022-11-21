import { MoviesContainer } from './styles';
import { Movie } from '..';

const MovieList = ({ movies }) => {
  return (
    <div>
      <MoviesContainer container>
        {movies.results.map((movie, index) => (
          <Movie key={index} movie={movie} index={index} />
        ))}
      </MoviesContainer>
    </div>
  );
};

export default MovieList;
