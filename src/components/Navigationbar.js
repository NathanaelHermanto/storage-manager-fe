import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../const';

const pages = [
    { page: 'Home', path: '/' },
    { page: 'Add', path: '/create' },
    
  ];

const Search = styled('div')(({ theme }) => ({
display: 'flex',
position: 'relative',
borderRadius: theme.shape.borderRadius,
backgroundColor: alpha(theme.palette.common.white, 0.15),
'&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
},
// marginLeft: 0,
"& :first-of-type": {
    flexGrow: 1
  },
  width: "auto",
  ".MuiInputBase-root": {
    width: "100%"
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
padding: theme.spacing(1, 1, 1, 1),
height: '100%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
color: 'inherit',
'& .MuiInputBase-input': {
    padding: theme.spacing(1, 0, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    width: '12ch',
    '&:focus': {
        width: '20ch',
    },
    },
},
}));

  

const NavigationBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    let navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const routeChange = (newPath) => {
        let path = newPath;
        navigate(path)
    }

    const fetchProductByName = async (product_name) => {
        return fetch(`${BASE_URL}api/items/${product_name}`)
        .then(response => response.json())
        .catch((e) => {
            setOpenAlert(true);
            console.log(e);
        })
    }

    const search = async () => {
        const data = await fetchProductByName(inputValue);

        if (data === 'undefined' || data.msg === 'item not found') {
            setOpenAlert(true);
            return;
        };

        const productId = data[0]._id;
        routeChange(`/product/${productId}`);
    }

    const handleSearch = async (event) => {
        if (event.keyCode !== 13 ) return;
        event.preventDefault();

        await search();
    }

    const onChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
      };

    return (
        <>
        <AppBar position='static' 
            sx={{ backgroundColor:'#ffbdbd' }}>
            <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Warehouse App
                        </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                            {pages.map(({page, path}) => (
                                <MenuItem onClick={handleCloseNavMenu} key={page} >
                                    <Typography textAlign="center">
                                        <Link to={path} style={{textDecoration: "none", color: 'black'}}> {page}</Link>
                                    </Typography>
                                </MenuItem>
                            ))} 
                        </Menu>
                    </Box>
                    
                    <Typography
                        variant="h10"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Warehouse App
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(({page, path}) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to={path} style={{textDecoration: "none", color: 'white' }}> {page}</Link>
                        </Button>
                        ))}
                    </Box>

                    <Search>
                        <SearchIconWrapper  sx={{cursor: 'pointer'}} onClick={search}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={inputValue}
                        onKeyDown={handleSearch}
                        onChange={onChange}
                        />
                    </Search>
                </Toolbar>
            </Container>
        </AppBar>

        <Snackbar open={openAlert} autoHideDuration={10000} onClose={handleClose}>
            <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
                Product not found!
                <br/>
                Please mind the upper and lowercase
            </Alert>
        </Snackbar>
        </>
    )
}

export default NavigationBar;