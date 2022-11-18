import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './css/Body.css'
import text from '../text.js'
import { useState, forwardRef } from 'react';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import request from '../hooks/useHttp'
import copy from 'copy-to-clipboard';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import qrcode from 'qrcode-generator'
import AddLinkIcon from '@mui/icons-material/AddLink';
import IconButton from '@mui/material/IconButton';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Body = () => {
    const [link, setLink] = useState('ЗДЕСЬ ПОЯВИТСЯ ВАША ССЫЛКА')
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState('');
    const [severity, setSeverity] = useState('');
    
    const newLink = async () => {
        let item = document.getElementById("standard-basic")
        if (!item.value) {
            setSeverity('warning')
            setOpen(true)
            setSnackbar('Введите URL!')
            return
        } 
        if (item.value.slice(0, 4) !== 'http') {
            item.value = 'https://' + item.value
        }

        try {
            let url = await request('api/link/generate', "POST", {
                from: item.value
            })
            setLink(<div className='result'>
            <p>Ваша ссылка: {item.value}</p>
            <p>Сокращение: {url.link.to}</p>
            <Button variant="outlined" startIcon={<ContentCutIcon />} onClick={() => {
                copy(url.link.to)
                setSeverity('success')
                setSnackbar('Ссылка скопирована!')
                setOpen(true)
            }}
                >
                Скопировать
            </Button>
        </div>)

            var qr = qrcode(4, 'L');
            qr.addData(url.link.to);
            qr.make();
            qr.createImgTag()
            document.getElementById('placeHolder').innerHTML = qr.createImgTag();

            setSeverity('success')
            setSnackbar('Ссылка сокращена!')
            setOpen(true)
        } catch (e) {
            setSeverity('error')
            setOpen(true)
            setSnackbar(e.message || 'Произошла ошибка!')
        }
    }

    return <div className="main">
        <div className='main-input'>
            <TextField id="standard-basic" label="Ваша ссылка" variant="standard"/>
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={newLink}  >
            <AddLinkIcon fontSize='large' />
            </IconButton>
        </div>
        <div className='link-result'>
        <div id="placeHolder" className='placeHolder'></div>
        {link}
        </div>
        <div className='main-info'>{text.ru.text}</div>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
          {snackbar}
        </Alert>
        </Snackbar>
    </div>
}

export default Body