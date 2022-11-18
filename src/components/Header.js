import './css/Header.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import IconButton from '@mui/material/IconButton';

const Header = () => {
    return <AppBar position="static" sx={{backgroundColor: 'var(--background-header)'}}>
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <InsertLinkIcon />
          </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            СОКРАЩЕНИЕ ССЫЛОК
          </Typography>
        </Toolbar>
    </AppBar>
}

export default Header