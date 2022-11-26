import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');
    const token = await data.request_token;

    if (data.success) {
      localStorage.setItem('filmpir_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('Sorry, your token could not created.');
  }
};

export const CreateSessionId = async () => {
  const token = localStorage.getItem('filmpir_token');
  if (token) {
    try {
      const {
        data: { session_id },
      } = await moviesApi.post('authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('filmpir_session_id', session_id);
      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
};
