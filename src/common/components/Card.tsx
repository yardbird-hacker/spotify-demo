import { Box, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React from 'react';

interface CardProps {
  name: string;
  image: string;
  artistName: string | undefined;
  imageSize: number;
}

const Card = ({ image, name, artistName, imageSize }: CardProps) => {
  return (
    <Box
      sx={{
        //width: imageSize,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        '&:hover .play-icon': {
          opacity: 1,
        },
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: '100%',
          aspectRatio: '1', // ensures square shape
          objectFit: 'cover',
          display: 'block',
          borderRadius: '8px',
        }}
      />

      {/* Play icon overlay */}
      <Box
        className="play-icon"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <PlayArrowIcon
          sx={{ width: '100%', height: 'auto', color: 'lightgreen' }}
        />
      </Box>

      <Typography variant="subtitle1" mt={1}>
        {name}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        {artistName}
      </Typography>
    </Box>
  );
};

export default Card;
