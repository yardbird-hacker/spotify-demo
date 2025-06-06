import React from 'react';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import axios from 'axios';
import { User } from '../models/user';

const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/v1/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Fail to fetch user profile');
  }
};

export default getCurrentUserProfile;
