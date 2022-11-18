import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { DrawerPaper, IconBtn, LinkBtn, Nav, StyledToolbar } from './styles';
import Sidebar from '../sidebar/Sidebar';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isAuthenticated = true;

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
          <IconBtn sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconBtn>
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkBtn color="inherit" onClick={() => navigate(`/profile/:id`)}>
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`}
                />
              </LinkBtn>
            )}
          </div>
          {isMobile && 'Search...'}
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
