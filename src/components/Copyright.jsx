import {Link, Typography} from "@mui/material";

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://americanroyaltyac.com" underline="none" sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
            }}>
                American Royalty A/C
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright