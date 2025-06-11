import React from 'react';
import { PlaylistTrack } from '../../../models/playlist';
import { TableCell, TableRow, styled } from '@mui/material';
import { Episode, Track } from '../../../models/track';
import moment from 'moment';

interface DesktopPlaylistItmProps {
  index: number;
  item: PlaylistTrack;
}

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
}));

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItmProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return 'description' in track;
  };
  const duration = item.track.duration_ms
    ? formatDuration(item.track.duration_ms)
    : 'Unknown';

  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || 'no name'}</TableCell>
      <TableCell>
        {isEpisode(item.track) ? 'N/A' : item.track.album?.name}
      </TableCell>
      <TableCell>
        {item.added_at ? moment(item.added_at).format('YYYY-MM-DD') : 'Unknown'}
      </TableCell>
      <TableCell> {moment(item.track.duration_ms).format('mm:ss')}</TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
