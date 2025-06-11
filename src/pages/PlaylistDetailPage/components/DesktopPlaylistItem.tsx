import React from 'react';
import { PlaylistTrack } from '../../../models/playlist';
import { TableCell, TableRow } from '@mui/material';
import { Episode, Track } from '../../../models/track';

interface DesktopPlaylistItmProps {
  index: number;
  item: PlaylistTrack;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItmProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return 'description' in track;
  };
  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || 'no name'}</TableCell>
      <TableCell>
        {isEpisode(item.track) ? 'N/A' : item.track.album?.name}
      </TableCell>
      <TableCell>{item.added_at || 'Unknown'}</TableCell>
      <TableCell>{item.track.duration_ms || 'Unknown'}</TableCell>
    </TableRow>
  );
};

export default DesktopPlaylistItem;
