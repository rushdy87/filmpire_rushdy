import { MoviesContainer } from './styles';
import { Movie } from '..';

const MovieList = ({ movies, limit }) => {
  return (
    <div>
      <MoviesContainer container>
        {movies.results.slice(0, limit).map((movie, index) => (
          <Movie key={index} movie={movie} index={index} />
        ))}
      </MoviesContainer>
    </div>
  );
};

export default MovieList;
