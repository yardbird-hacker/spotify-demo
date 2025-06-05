import { Typography } from '@mui/material';
import React from 'react';
import useGetNewReleases from '../../../hooks/useGetNewReleases';
import { loadingMessage } from '../../../common/components/message';
import ErrorMessage from '../../../common/components/ErrorMessage';
//import {Grid2} from '@mui/material/Unstable_Grid2';
import Grid from '@mui/material/Grid';
import Card from '../../../common/components/Card';

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  if (isLoading) {
    return loadingMessage;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  console.log(window.innerWidth);
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid item xs={6} sm={4} md={2} lg={2} xl={2} key={album.id}>
              <Card
                image={album.images[0].url}
                name={album.name}
                artistName={album.artists[0].name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
      ;
    </div>
  );
};

export default NewReleases;
