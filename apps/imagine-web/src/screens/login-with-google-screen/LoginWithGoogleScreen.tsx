import { useLocation } from 'wouter';
import { toast } from 'react-toastify';
import { Card } from '../../components/card/Card';
import React, { useContext, useEffect, useMemo } from 'react';
import { localStorageService, sessionContext } from '@imagine-cms/web';
import { useGoogleUserAuthenticate, useUserFetchOne } from '@imagine-cms/client';

export function LoginWithGoogleScreen() {
  const [, setLocation] = useLocation();
  const { setSession } = useContext(sessionContext);
  const googleUserAuthenticate = useGoogleUserAuthenticate();
  const fetchUser = useUserFetchOne();

  const googleAuthCode = useMemo(() => {
    return window.location.hash.split('#access_token=')[1].split('&token_type')[0]
  }, []);

  const onAttemptGoogleAuthentication = async (authCode: string) => {
    try {
      const session = await googleUserAuthenticate.execute({ googleAuthToken: authCode });
      localStorageService.set('SESSION', session.sessionToken);
      const matchingUser = await fetchUser.fetch({ id: googleUserAuthenticate.data!.userID });
      toast.success(`Welcome back, ${matchingUser.username}`);
      setSession(matchingUser);
      setLocation('/me');
    } catch (e: any) {
      toast.error('There was a problem logging in');
    }
  }

  useEffect(() => {
    if (!googleAuthCode) {
      return;
    }
    if (googleUserAuthenticate.loading) {
      return;
    }
    onAttemptGoogleAuthentication(googleAuthCode);
  }, [googleAuthCode]);

  return (
    <Card header="Google Login">
      logging in with token <b>{googleAuthCode}</b>
    </Card>
  )
}