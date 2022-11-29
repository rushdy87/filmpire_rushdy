import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';

import { RatedCards } from '..';

const Profile = () => {
  const { user } = useSelector(userSelector);

  const sessionId = localStorage.getItem('filmpir_session_id');

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: sessionId,
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: 'watchlist/movies',
      accountId: user.id,
      sessionId: sessionId,
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, [refetchFavorites, refetchWatchlisted]);

  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logOut}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
