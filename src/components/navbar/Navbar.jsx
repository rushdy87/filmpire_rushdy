import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Button, Avatar, useMediaQuery, useTheme } from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';

import { Sidebar, Search } from '..';
import { fetchToken, CreateSessionId, moviesApi } from '../../utils';
import { setUser, userSelector } from '../../features/auth';
import { DrawerPaper, IconBtn, LinkBtn, Nav, StyledToolbar } from './styles';
import { ColorModeContext } from '../../utils/ToggleColorMode';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const colorMode = useContext(ColorModeContext);

  const token = localStorage.getItem('filmpir_token');

  useEffect(() => {
    let sessionId = localStorage.getItem('filmpir_session_id');
    const logInUser = async () => {
      if (token) {
        if (!sessionId) {
          sessionId = await CreateSessionId(token);
        }
        const { data: userData } = await moviesApi.get(
          `/account?session_id=${sessionId}`
        );
        dispatch(setUser(userData));
      }
    };
    logInUser();
  }, [token, dispatch]);

  return (
    <>
      <AppBar position="fixed">
        <StyledToolbar>
          {isMobile && (
            <IconBtn
              edge="start"
              onClick={() => setMobileOpen((prevState) => !prevState)}
            >
              <Menu />
            </IconBtn>
          )}
          <IconBtn sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconBtn>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkBtn
                color="inherit"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`}
                />
              </LinkBtn>
            )}
          </div>
          {isMobile && <Search />}
        </StyledToolbar>
      </AppBar>
      <div>
        <Nav>
          {isMobile ? (
            <DrawerPaper
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevState) => !prevState)}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </DrawerPaper>
          ) : (
            <DrawerPaper
              variant="permanent"
              open
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </DrawerPaper>
          )}
        </Nav>
      </div>
    </>
  );
};

export default Navbar;
