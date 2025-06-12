import React, { useEffect } from 'react';
import {
  Box,
  Button,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { loadingMessage } from '../../../common/components/message';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: '100%',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
}));

const AlbumImage = styled('img')({
  borderRadius: '4px',
  marginRight: '12px',
});

interface SearchResultListProps {
  // props 추가
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();
  useEffect(() => {
    // fetchNextPage 호출 추가
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);
  return (
    <StyledTableContainer>
      <TableBody sx={{ width: '100%' }}>
        {list.map((track) => (
          <StyledTableRow key={track.id}>
            <TableCell>
              <Box display="flex" alignItems="center">
                <Box>
                  <AlbumImage src={track.album?.images[0].url} width="40px" />
                </Box>
                <Box>
                  <Typography fontWeight={700}>{track.name}</Typography>
                  <Typography color="text.secondary">
                    {track.artists ? track.artists[0].name : 'Unknown Artist'}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>{track.album?.name}</TableCell>
            <TableCell>
              <Button>Add</Button>
            </TableCell>
          </StyledTableRow>
        ))}
        <div ref={ref} style={{ height: 1 }}>
          {isFetchingNextPage ? (
            <div style={{ fontSize: '24px' }}>{loadingMessage}</div>
          ) : !hasNextPage ? (
            <div style={{ fontSize: '16px', color: '#888' }}>No More!!</div>
          ) : null}
        </div>
      </TableBody>
    </StyledTableContainer>
  );
};

export default SearchResultList;
