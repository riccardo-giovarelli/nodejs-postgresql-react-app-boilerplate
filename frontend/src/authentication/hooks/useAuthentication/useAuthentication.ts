import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { useAuthenticationStore } from '@/authentication/AuthenticationStore/AuthenticationStore';
import tank from '@/utils/axios';

const useAuthentication = () => {
  const setLogout = useAuthenticationStore((state) => state.setLogout);
  const email = useAuthenticationStore((state) => state.userData?.email);
  const navigate = useNavigate();

  const isAuthenticated = useMemo(() => !!email, [email]);

  const checkAuthentication = async () => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  };

  const logout = async () => {
    try {
      const results = await tank.post('/users/logout');

      if (results?.data?.code === 'LOGGED_OUT') {
        setLogout();
      } else {
        throw new Error('Error logging out from server');
      }
    } catch (error) {
      setLogout();
      console.error('Logout failed on server, forcing local logout:', error);
    }
  };

  return { isAuthenticated, checkAuthentication, logout };
};

export default useAuthentication;
