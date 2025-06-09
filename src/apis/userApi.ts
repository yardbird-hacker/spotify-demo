import React from 'react';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import axios from 'axios';
import { User } from '../models/user';
import api from '../utils/api';

const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get(`/v1/me`);
    return response.data;
  } catch (error) {
    throw new Error('Fail to fetch user profile');
  }
};

export default getCurrentUserProfile;
