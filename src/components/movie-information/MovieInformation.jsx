import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';

import { MovieList } from '..';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from '../../services/TMDB';
import { userSelector } from '../../features/auth';
import {
  BtnsContainer,
  CastImg,
  ContainerSpaceAround,
  GenreImg,
  GenresContainer,
  Links,
  Poster,
  StyledModal,
  Video,
} from './styles';
import genreIcons from '../../assets/genres';

const TMDB_URL = 'https://api.themoviedb.org/3/account';
const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

const MovieInformation = () => {
  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  const sessionId = localStorage.getItem('filmpir_session_id');

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: sessionId,
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: sessionId,
    page: 1,
  });
  const { data: recommendations } = useGetRecommendationsQuery({
    id,
    list: '/recommendations',
  });

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);
  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `${TMDB_URL}/${user.id}/favorite?api_key=${TMDB_KEY}&session_id=${sessionId}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `${TMDB_URL}/${user.id}/watchlist?api_key=${TMDB_KEY}&session_id=${sessionId}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Some thing has gone wrong - Go back</Link>
      </Box>
    );
  }
  return (
    <ContainerSpaceAround container>
      <Grid
        item
        sm={12}
        lg={4}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '30px',
        }}
      >
        <Poster
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <ContainerSpaceAround item>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min |{' '}
            {data?.spoken_languages.length > 0
              ? `Language: ${data.spoken_languages[0].name}`
              : ''}
          </Typography>
        </ContainerSpaceAround>
        <GenresContainer item>
          {data?.genres?.map((genre) => (
            <Links
              style={{ cursor: 'pointer' }}
              key={genre.name}
              onClick={() => {
                navigate(`/genre/${genre.name}`);
                dispatch(selectGenreOrCategory(genre.id));
              }}
            >
              <GenreImg
                src={genreIcons[genre.name.toLowerCase()]}
                alt={genre.name}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Links>
          ))}
        </GenresContainer>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character, index) =>
                  character.profile_path && (
                    <Grid
                      key={index}
                      item
                      xs={4}
                      md={2}
                      onClick={() => navigate(`/actors/${character.id}`)}
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                      <CastImg
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <BtnsContainer item container spacing={1}>
            <BtnsContainer item xs={12}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </BtnsContainer>
            <BtnsContainer item xs={12}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    onClick={() => navigate('/')}
                    color="inherit"
                    variant="subtitle2"
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </BtnsContainer>
          </BtnsContainer>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {/* Loop through recomaned movies */}
        {recommendations ? (
          <MovieList movies={recommendations} limit={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>
      <StyledModal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 ? (
          <Video
            autoPlay
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        ) : (
          <div />
        )}
      </StyledModal>
    </ContainerSpaceAround>
  );
};

export default MovieInformation;
