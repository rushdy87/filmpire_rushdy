import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { Content, Main, StyledToolbar } from './styles';

import { Movies, MovieInformation, Actors, Profile, Navbar } from './';

const App = () => {
  return (
    <Main>
      <CssBaseline />
      <Navbar />
      <Content>
        <StyledToolbar />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/categories/:id" element={<Movies />} />
          <Route path="/genre/:id" element={<Movies />} />
          <Route path="/approved" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Content>
    </Main>
  );
};

export default App;
