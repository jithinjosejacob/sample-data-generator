import { styled, Typography } from '@mui/material';

const ArtisticTypography = styled(Typography)(({theme, variant}) => ({
    fontFamily: '"Fredoka One", cursive',
    fontSize: 
        variant === 'h1'
            ? '3rem'
            : variant === 'h2'
            ? '2.5rem'
            : variant === 'h3'
            ? '2rem'
            : variant === 'h4'
            ? '1.5rem'
            : variant === 'h5'
            ? '1.25rem'
            : variant === 'h6'
            ? '1rem'
            : '0.875rem',
        color: '#0d47a1',
        textShadow: '2px 2px #ffeb3b', // Yellow Shadow           
}));

export default ArtisticTypography;