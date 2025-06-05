import { CLIENT_ID } from '../configs/authConfig';
import { REDIRECT_URL } from '../configs/commonConfig';
import { AuthUrlParams } from '../models/auth';
import { base64encode, generateRandomString, sha256 } from './crypto';

export const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const clientId = CLIENT_ID;
  const redirectUri = REDIRECT_URL;

  const scope = 'user-read-private user-read-email';
  const authUrl = new URL('https://accounts.spotify.com/authorize');

  // generated in the previous step
  window.localStorage.setItem('code_verifier', codeVerifier);

  if (clientId && redirectUri) {
    const params: AuthUrlParams = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    window.location.href = authUrl.toString();
  }
};
